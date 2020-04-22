const noteHeightLimit = 6; // 3 block jump
const setups = [ // TODO: Port to different tempos
	{ offset: 0, structType: 0 },
	{ offset: -2, structType: 1 },
	{ offset: -6, structType: 2 },
	{ offset: -11, structType: 3 },
	{ offset: -16, structType: 4 }
];
const blocksPerChunk = 8;
const numStructChunks = 240 / blocksPerChunk;

const noteColBoxHeights = [3, 5, 4, 5, 6, 6, 4];
const structTemplates = [
	{ // 0: Default
		entityProperties: [{ parachute: false }]
	},
	{ // 1: 2 Block Drop
		entityProperties: [{ parachute: false }]
	},
	{ // 2: 1 Block Parachute
		entityProperties: [{ parachute: true }]
	},
	{ // 3: 2 Block Parachute
		entityProperties: [{ parachute: true }]
	},
	{ // 4: 3 Block Parachute
		entityProperties: [{ parachute: true }]
	},
	{ // 5: 3 Block Drop
		entityProperties: [{ parachute: false }]
	},
	{ // 6: 1 Block Drop
		entityProperties: [{ parachute: false }]
	}
];
const obfuscateNotes = false; // TODO: Shuffle setups array multiple times to make this work

let structures = [];
let cells = [];
let chunks = [];
for (let i = 0; i < numStructChunks; i++) chunks[i] = [];

class Blueprint {
	constructor(arr2d) {
		this.grid = [];
		for (let i = 0; i < arr2d[0].length; i++) {
			this.grid[i] = [];
			for (let j = 0; j < arr2d.length; j++) {
				this.grid[i][j] = arr2d[j][i];
			}
		}

		this.width = this.grid.length;
		this.height = this.grid[0].length;
	}

	get(x, y) {
		return this.grid[x][y];
	}

	set(x, y, n) {
		this.grid[x][y] = n;
	}

	insertRow(y, row) {
		for (let i = 0; i < row.length; i++) {
			this.grid[i].splice(y, 0, row[i]);
		}
		this.height++;
	}
}

/* Collision Types:
   1. The two boxes must be touching.
   2. The two boxes must be intersecting in the x domain and touching in the y domain.
   3. The two boxes must be intersecting in the y domain and touching in the x domain.
*/

class CollisionBox {
	constructor(xOfs, yOfs, w, h, type) {
		if (type === undefined) this.type = 0;
		else this.type = type;
		this.xOfs = xOfs;
		this.yOfs = yOfs;
		this.x = this.xOfs;
		this.y = this.yOfs;
		this.w = w;
		this.h = h;
		this.whitelist = [];
	}

	moveTo(x, y) {
		this.x = x + this.xOfs;
		this.y = y + this.yOfs;
	}

	getCollisionWith(otherBox) {
		let dists = this.getCollisionDistWith(otherBox);
		switch (this.type) {
		case 0:
			return (dists.xdist <= 0 && dists.ydist <= 0 && dists.xdist + dists.ydist < 0);
		case 1:
			return (dists.xdist < 0 && dists.ydist <= 0 && dists.xdist + dists.ydist < 0);
		case 2:
			return (dists.xdist <= 0 && dists.ydist < 0 && dists.xdist + dists.ydist < 0);
		default:
			console.log('invalid colbox');
			return true;
		}
	}

	getCollisionDistWith(otherBox) {
		let r1 = {
			x1: this.x,
			x2: this.x + this.w,
			y1: this.y,
			y2: this.y + this.h
		};
		let r2 = {
			x1: otherBox.x,
			x2: otherBox.x + otherBox.w,
			y1: otherBox.y,
			y2: otherBox.y + otherBox.h
		};
		return getRectangleDist(r1, r2);
	}
}

class Structure {
	constructor(type, x, y, id) {
		Object.assign(this, getStructTemplate(type));

		this.type = type;
		this.x = x;
		this.y = y;

		this.collisionBox.moveTo(this.x + this.xOfs, this.y);
		if (id === undefined) this.id = structures.length;
		else this.id = id;
		this.chunkIndex = null;
		this.entities = [];
		this.cell = null;
		this.hasModifiedBlueprint = false;
		this.conflictingStructures = [];
		this.isNote = false;
		this.originalX = x;
		this.putInChunk();

		structures.push(this);
	}

	checkForCollisions() {
		this.conflictingStructures = [];
		for (let j = 0; j < 3; j++) {
			if (this.chunkIndex + j - 1 < 0 || this.chunkIndex + j - 1 >= numStructChunks) continue;
			for (let k = 0; k < chunks[this.chunkIndex + j - 1].length; k++) {
				let otherStruct = chunks[this.chunkIndex + j - 1][k];
				if (this.id === otherStruct.id) continue;
				if (this.checkCollisionWith(otherStruct)) this.conflictingStructures.push(otherStruct);
			}
		}
	}

	checkCollisionWith(otherStruct) { // TODO: Multiple collision box support
		return this.collisionBox.getCollisionWith(otherStruct.collisionBox);
	}

	putInChunk() {
		this.chunkIndex = Math.floor(this.x / blocksPerChunk);
		chunks[this.chunkIndex].push(this);
	}

	updateChunkLocation() { // TODO: Generalize for all structures or move to NoteStructure class
		let curChunk = this.chunkIndex;
		let newChunk = Math.floor(this.x / blocksPerChunk);

		if (newChunk !== curChunk) {
			// Remove a reference to the structure in the current chunk
			let foundIndex = chunks[curChunk].findIndex((thisStruct) => (thisStruct.id === this.id));
			chunks[curChunk].splice(foundIndex, 1);

			// Add to the new chunk
			this.putInChunk();
		}

		// Remove from cell // TODO: Add to new cell
		// TODO: Cells that get merged are not handled properly? (Might not be a necessary fix)
		let curCell = this.cell;
		if (curCell !== null) curCell.removeStructure(this);
		this.originalX = this.x;
	}
}

class NoteStructure extends Structure {
	constructor(type, x, y) {
		super(type, x, y);
		this.isNote = true;
		[this.setup] = setups;
	}

	checkCollisionWith(otherStruct) { // TODO: Prevent entities from going off the top or further left than x = 27
		let dists = this.collisionBox.getCollisionDistWith(otherStruct.collisionBox);
		if (dists.xdist === 0 && dists.ydist < -1) { // Merge into a cell
			return this.checkCellCollision(otherStruct, true);
		}
		if (dists.xdist === 0 && dists.ydist === -1) {
			return false; // Structures are next to each other, but don't need to be merged
		}

		return this.collisionBox.getCollisionWith(otherStruct.collisionBox);
	}

	checkCellCollision(otherStruct, doAdd) {
		/* let tID = this.id;
            let oID = otherStruct.id;
            console.log(tID + ' @ ' + this.collisionBox.x + ' <-> ' + oID + ' @ ' + otherStruct.collisionBox.x); */
		let highestPairPoint = Math.max(
			this.collisionBox.y + this.collisionBox.h,
			otherStruct.collisionBox.y + otherStruct.collisionBox.h
		);
		let highestPoint;
		let isAcceptable = true;
		let thisCell = this.cell;
		let otherCell = otherStruct.cell;

		// Make sure all structures can be expanded and put into cells
		let isSameCell;
		if (thisCell === null || otherCell === null) isSameCell = false;
		else isSameCell = (otherCell.id === thisCell.id);
		if (isSameCell) return false;
		if (thisCell !== null) {
			highestPoint = Math.max(highestPairPoint, thisCell.highestPoint);
			for (let i = 0; i < thisCell.members.length; i++) {
				isAcceptable = isAcceptable
				&& thisCell.members[i].isExtendableUpwardsTo(highestPoint)
				&& thisCell.members[i].canBeInCell;
			}
		}
		if (otherCell !== null && !isSameCell) {
			highestPoint = Math.max(highestPairPoint, otherCell.highestPoint);
			if (!isSameCell) {
				for (let i = 0; i < otherCell.members.length; i++) {
					isAcceptable = isAcceptable
					&& otherCell.members[i].isExtendableUpwardsTo(highestPoint)
					&& otherCell.members[i].canBeInCell;
				}
			}
		}
		isAcceptable = isAcceptable && this.canBeInCell && otherStruct.canBeInCell;


		// Conflict if there is an issue
		if (!isAcceptable) return true;

		// Else, add to the cell
		if (!doAdd) return false;
		if (thisCell === null && otherCell !== null) {
			otherStruct.cell.add(this);
			thisCell = otherCell;
		} else if (thisCell !== null && otherCell === null) {
			this.cell.add(otherStruct);
		} else if (thisCell !== null && otherCell !== null && thisCell.id !== otherCell.id) {
			thisCell.mergeWith(otherCell);
			thisCell.add(otherStruct);
		} else if (thisCell === null && otherCell === null) {
			let newCell = createCell();
			newCell.add(this);
			newCell.add(otherStruct);
			thisCell = newCell;
		}

		return false;
	}

	trimSide(isRightSide, numBlocks) {
		let x;
		if (isRightSide) x = 2;
		else x = 0;
		for (let i = 0; i < numBlocks; i++) {
			if (1 + i > this.blueprint.height) break;
			this.blueprint.set(x, 1 + i, 0);
		}
	}

	extendUpwardsBy(numBlocks, isCopyMode = false) {
		if (numBlocks === 0) return;
		if (!isCopyMode) {
			for (let i = 0; i < numBlocks; i++) {
				this.shearInsertRow(3, 1, [1, 0, 1]);
			}
		} else {
			for (let i = 0; i < numBlocks; i++) {
				this.insertCopyRow(2, this.blueprint.height - 1);
			}
		}
		this.collisionBox.h += numBlocks;
		this.entityPos[0].y += numBlocks;
		this.yOfs -= numBlocks;
		this.hasModifiedBlueprint = true;
	}

	// Specialized function for note blueprints to splice middle rows at y1, but the sides at y2
	shearInsertRow(y1, y2, row) {
		for (let i = 0; i < row.length; i++) {
			if (i === 0 || i === row.length - 1) this.blueprint.grid[i].splice(y2, 0, row[i]);
			else this.blueprint.grid[i].splice(y1, 0, row[i]);
		}
		this.blueprint.height++;
		this.hasModifiedBlueprint = true;
	}

	// [Unused] Specialized function for note blueprints that inserts a copy of the walls of the row at y1 to y2.
	insertCopyRow(y1, y2) {
		let row = [];
		for (let i = 0; i < this.blueprint.width; i++) {
			if (i !== 0 && i !== this.blueprint.width - 1) row.push(0); // Only clone the walls, empty space otherwise
			else row.push(this.blueprint.get(i, y1));
		}
		for (let i = 0; i < row.length; i++) {
			this.blueprint.grid[i].splice(y2, 0, row[i]);
		}
		this.blueprint.height++;
		this.hasModifiedBlueprint++;
	}

	isExtendableUpwardsTo(yPos) {
		// return (Math.abs(yPos - this.collisionBox.y) <= noteHeightLimit);
		if (yPos >= this.collisionBox.y) {
			return yPos - this.collisionBox.y <= noteHeightLimit;
		}
		return this.collisionBox.y - yPos <= noteHeightLimit - 3;
	}

	moveBySetup(setup) {
		// First, remove all references to collisions with this structure
		this.conflictingStructures.forEach((otherStruct) => {
			let foundIndex = otherStruct.conflictingStructures.findIndex((thisStruct) => (thisStruct.id === this.id));
			otherStruct.conflictingStructures.splice(foundIndex, 1);
		});

		// Change structure type to the appropriate setup
		this.changeToType(setup.structType);

		// Move structure
		let xOfs = setup.offset - this.setup.offset;
		this.x += xOfs;
		this.collisionBox.x += xOfs;
		this.setup = setup;
		this.conflictingStructures = [];

		// Update Chunk
		this.updateChunkLocation();
	}

	changeToType(typeNum) {
		let template = getStructTemplate(typeNum);
		this.blueprint = getBlueprint(typeNum);
		let prevLoc = { x: this.collisionBox.x, y: this.collisionBox.y };
		this.collisionBox = getColBox(typeNum);
		this.collisionBox.x = prevLoc.x;
		this.collisionBox.y = prevLoc.y;
		this.yOfs = -this.collisionBox.h;
		this.entityProperties = template.entityProperties;
		this.canBeInCell = template.canBeInCell;
	}

	tryAllSetups() {
		// Try to move a note to all available setups. Return the success, as well as all available nodes to traverse.
		let origSetup = this.setup;
		let availableMoves = [];
		let conflictAmount = Infinity;
		for (let i = 0; i < setups.length; i++) {
			if (setups[i].offset === origSetup.offset) continue;
			this.moveBySetup(setups[i]);
			this.checkForCollisions();
			let conflicts = this.conflictingStructures;
			conflictAmount = Math.min(conflictAmount, this.conflictingStructures.length);
			availableMoves.push({ setup: setups[i], structs: conflicts });
			if (this.conflictingStructures.length === 0) {
				return { success: true, availableMoves: [] };
			}
		}
		availableMoves = availableMoves.filter((move) => move.structs.length === conflictAmount);

		// If unsuccessful...
		this.moveBySetup(origSetup);
		return { success: false, availableMoves, minConflicts: conflictAmount };
	}
}

class Cell {
	constructor(id) {
		this.id = id;
		this.members = [];
		this.locationMap = {};
		this.highestPoint = 0;
		this.startX = Infinity;
		this.endX = 0;
	}

	add(struct) { // Add a structure to the cell
		this.members.push(struct);
		struct.cell = this;

		let structHighestPoint = struct.collisionBox.y + struct.collisionBox.h;
		this.highestPoint = Math.max(this.highestPoint, structHighestPoint);
		this.startX = Math.min(this.startX, struct.collisionBox.x);
		this.endX = Math.max(this.endX, struct.collisionBox.x);

		this.addToLocMap(struct);
	}

	mergeWith(otherCell) { // Combine two cells together
		otherCell.members.forEach((struct) => {
			this.add(struct);
		});
		otherCell.clear();
	}

	build() { // Modify the blueprints of each member to form the proper structure
		if (this.members.length === 0) return;
		for (let i = this.startX; i <= this.endX; i++) { // First Pass: Expanding
			if (this.locationMap[i] === undefined) {
				console.log('Missing structure in cell.');
				continue;
			}
			this.locationMap[i].list.forEach((struct) => {
				let expandDist = this.highestPoint - (struct.collisionBox.y + struct.collisionBox.h);
				struct.extendUpwardsBy(expandDist);
			});
		}
		for (let i = this.startX; i < this.endX; i++) { // Second Pass: Trimming
			this.locationMap[i].list.forEach((struct) => {
				let nextStruct = this.locationMap[i + 1].tallest;
				let trimDist = nextStruct.collisionBox.h - 1;
				struct.trimSide(true, trimDist);
				nextStruct.trimSide(false, trimDist);
			});
		}
	}

	addToLocMap(struct) { // Register a structure in the location map
		const xPos = struct.collisionBox.x;
		if (this.locationMap[xPos] === undefined) this.locationMap[xPos] = { list: [], tallest: struct };
		else {
			this.locationMap[xPos].list.forEach((localStruct) => {
				let localStructHeight = localStruct.collisionBox.y + localStruct.collisionBox.h;
				let tallestStructHeight = this.locationMap[xPos].tallest.collisionBox.y
				+ this.locationMap[xPos].tallest.collisionBox.h;
				if (localStructHeight > tallestStructHeight) this.locationMap[xPos].tallest = localStruct;
			});
		}
		this.locationMap[xPos].list.push(struct);
	}

	clear() {
		this.members = [];
		this.locationMap = {};
	}

	removeStructure(struct) {
		// Remove from member list
		let origIndex = this.members.findIndex((thisStruct) => (thisStruct.id === struct.id));
		this.members.splice(origIndex, 1);

		// Remove from location map
		let origEntry = this.locationMap[struct.originalX];
		let foundIndex = origEntry.list.findIndex((thisStruct) => (thisStruct.id === struct.id));
		origEntry.list.splice(foundIndex, 1);

		// Remove from tallest structure if it is this cell, recalculate as necessary.
		// Also recalculate starting and ending x coords
		if (this.locationMap[struct.originalX].tallest.id === struct.id) {
			let newStartX = 240;
			let newEndX = 0;
			if (origEntry.list.length === 0) {
				delete this.locationMap[struct.originalX];
				if (struct.originalX !== this.startX && struct.originalX !== this.endX) {
					this.split(struct.originalX);
				}
			} else {
				[origEntry.tallest] = origEntry.list;
				origEntry.list.forEach((localStruct) => {
					let localStructHeight = localStruct.collisionBox.y + localStruct.collisionBox.h;
					let tallestStructHeight = origEntry.tallest.collisionBox.y + origEntry.tallest.collisionBox.h;
					if (localStructHeight > tallestStructHeight) origEntry.tallest = localStruct;
				});
			}
			this.members.forEach((localStruct) => {
				if (localStruct.x < newStartX) newStartX = localStruct.x;
				if (localStruct.x > newEndX) newEndX = localStruct.x;
			});
			this.startX = newStartX;
			this.endX = newEndX;
		}
		struct.cell = null;
	}

	split(splitX) { // Split the cell in two, removing structures from this cell and creating a new one
		// Store structures to be moved
		let moveStructures = [];
		/* for (let i = splitPoint; i < this.members.length; i++) {
			moveStructures.push(this.members[i]);
		} */
		for (let i = splitX + 1; i <= this.endX; i++) {
			this.locationMap[i].list.forEach((struct) => {
				moveStructures.push(struct);
			});
		}

		// Remove structures to be moved from this cell
		for (let i = moveStructures.length - 1; i >= 0; i--) {
			// console.log('split off '+i);
			this.removeStructure(moveStructures[i]);
		}

		// Add those structures to a new cell
		let newCell = createCell();
		for (let i = 0; i < moveStructures.length; i++) {
			newCell.add(moveStructures[i]);
		}
	}
}

function getRectangleDist(r1, r2) { // Thanks Tri
	let xdist = Math.max(r1.x1 - r2.x2, r2.x1 - r1.x2);
	let ydist = Math.max(r1.y1 - r2.y2, r2.y1 - r1.y2);
	return { xdist, ydist };
}

/* Structure Encoding:
      0 = Air
      1 = Block
      2 = Cloud Block
      3 = Note Block
*/

function getStructTemplate(n) {
	// TODO: Allow other setups to be in cells after fixing interactions
	switch (n) {
	case 0: return {
		blueprint: getBlueprint(n),
		entityPos: [{ x: 1, y: 2 }],
		entityProperties: [{ parachute: false }],
		xOfs: -1,
		yOfs: -3,
		collisionBox: getColBox(n),
		canBeInCell: true
	};
	case 1: return {
		blueprint: getBlueprint(n),
		entityPos: [{ x: 1, y: 2 }],
		entityProperties: [{ parachute: false }],
		xOfs: -1,
		yOfs: -5,
		collisionBox: getColBox(n),
		canBeInCell: false
	};
	case 2: return {
		blueprint: getBlueprint(n),
		entityPos: [{ x: 1, y: 2 }],
		entityProperties: [{ parachute: true }],
		xOfs: -1,
		yOfs: -4,
		collisionBox: getColBox(n),
		canBeInCell: false
	};
	case 3: return {
		blueprint: getBlueprint(n),
		entityPos: [{ x: 1, y: 2 }],
		entityProperties: [{ parachute: true }],
		xOfs: -1,
		yOfs: -5,
		collisionBox: getColBox(n),
		canBeInCell: false
	};
	case 4: return {
		blueprint: getBlueprint(n),
		entityPos: [{ x: 1, y: 2 }],
		entityProperties: [{ parachute: true }],
		xOfs: -1,
		yOfs: -6,
		collisionBox: getColBox(n),
		canBeInCell: false
	};
	case 5: return {
		blueprint: getBlueprint(n),
		entityPos: [{ x: 1, y: 2 }],
		entityProperties: [{ parachute: false }],
		xOfs: -1,
		yOfs: -6,
		collisionBox: getColBox(n),
		canBeInCell: false
	};
	case 6: return {
		blueprint: getBlueprint(n),
		entityPos: [{ x: 1, y: 2 }],
		entityProperties: [{ parachute: false }],
		xOfs: -1,
		yOfs: -4,
		collisionBox: getColBox(n),
		canBeInCell: false
	};

	default:
		console.log('invalid setup');
		return null;

            // FIXME: Some of the setups connect badly (like the 3 block drop)
	}
}

function getBlueprint(n) {
	switch (n) {
	case 0: return new Blueprint([
		[0, 1, 0],
		[1, 0, 1],
		[1, 2, 1],
		[0, 3, 0]
	]);
	case 1: return new Blueprint([
		[0, 1, 0],
		[1, 0, 1],
		[1, 2, 1],
		[1, 0, 1],
		[1, 0, 1],
		[0, 3, 0]
	]);
	case 2: return new Blueprint([
		[0, 1, 0],
		[1, 0, 1],
		[1, 2, 1],
		[1, 0, 1],
		[0, 3, 0]
	]);
	case 3: return new Blueprint([
		[0, 1, 0],
		[1, 0, 1],
		[1, 2, 1],
		[1, 0, 1],
		[1, 0, 1],
		[0, 3, 0]
	]);
	case 4: return new Blueprint([
		[0, 1, 0],
		[1, 0, 1],
		[1, 2, 1],
		[1, 0, 1],
		[1, 0, 1],
		[1, 0, 1],
		[0, 3, 0]
	]);
	case 5: return new Blueprint([
		[0, 1, 0],
		[1, 0, 1],
		[1, 2, 1],
		[1, 0, 1],
		[1, 0, 1],
		[1, 0, 1],
		[0, 3, 0]
	]);
	case 6: return new Blueprint([
		[0, 1, 0],
		[1, 0, 1],
		[1, 2, 1],
		[1, 0, 1],
		[0, 3, 0]
	]);
	default:
		console.log('invalid blueprint');
		return null;
	}
}

function getColBox(n) {
	switch (n) {
	case 0: return new CollisionBox(1, 1, 1, 3);
	case 1: return new CollisionBox(1, 1, 1, 5);
	case 2: return new CollisionBox(1, 1, 1, 4);
	case 3: return new CollisionBox(1, 1, 1, 5);
	case 4: return new CollisionBox(1, 1, 1, 6);
	case 5: return new CollisionBox(1, 1, 1, 6);
	case 6: return new CollisionBox(1, 1, 1, 4);
	default:
		console.log('invalid collision box');
		return null;
	}
}

function createCell() {
	let newCell = new Cell(cells.length);
	cells.push(newCell);
	return newCell;
}

// TODO: Conflict queue, push extra collisions into it that can have pre-filled blacklist
// TODO: Maybe start the queue with both conflicting structures?
// Where the magic happens
function handleAllConflicts() {
	let structQueue = [];
	structures.forEach((struct) => structQueue.push({ struct, blacklist: [] }));
	// structures.forEach((struct) => {
	while (structQueue.length > 0) {
		let structEntry = structQueue.shift();
		let { struct } = structEntry;
		let { blacklist } = structEntry;
		struct.checkForCollisions();
		if ((struct.conflictingStructures.length > 0 || obfuscateNotes) && struct.isNote) {
			let success = false;
			let nodeCount = 0;
			let moveQueue = [{ struct, history: [] }];
			while (moveQueue.length > 0) {
				nodeCount++;
				let entry = moveQueue.shift();
				entry.history.forEach((step) => step.struct.moveBySetup(step.setup));
				let attempt = entry.struct.tryAllSetups();
				if (attempt.success) {
					if (nodeCount > 1) {
						console.log(`success after ${nodeCount} attempts for struct ${struct.id}`);
						for (let i = 0; i < entry.history.length; i++) {
							console.log(`${i + 1}. Move ${entry.history[i].struct.id} to ${entry.history[i].setup.offset}`);
						}
						console.log(`${entry.history.length + 1}. Move ${entry.struct.id} to ${entry.struct.setup.offset}`);
					}
					success = true;
					break;
				}
				if (!useSolver) break;
				/* if (attempt.minConflicts > 1 && attempt.minConflicts !== Infinity) { // FIXME: Make sure new system is working as intended
					console.log(`splitting ${attempt.minConflicts} conflicts from struct ${struct.id}`);
					for (let i = 0; i < attempt.availableMoves.length; i++) {
						let { structs } = attempt.availableMoves[i];
						if (structs.length === attempt.minConflicts);
						for (let j = 0; j < attempt.minConflicts; j++) {
							console.log(`pushing struct ${structs[j].id}`);
							let newBlacklist = mergeHistoryAndBlacklist(entry.history, blacklist);
							newBlacklist.push(struct.id);
							structQueue.push({ struct: structs[j], blacklist: newBlacklist });
						}
					}
					continue;
				} */
				let availableMoves = attempt.availableMoves.filter(
					(move) => (!(isAlreadyUsed(entry.history, blacklist, move.structs[0]) || move.structs.length > 1))
				);
				if (availableMoves.length === 0 && attempt.minConflicts <= 1) {
					console.log(`queue exhausted for struct ${struct.id}`);
				}
				for (let i = 0; i < availableMoves.length; i++) {
					let history = entry.history.slice(0);
					history.push({ struct: entry.struct, setup: availableMoves[i].setup, origSetup: entry.struct.setup });
					moveQueue.push({ struct: availableMoves[i].structs[0], history });
				}
				entry.history.forEach((step) => step.struct.moveBySetup(step.origSetup));
				if (nodeCount >= 4096) { // Quit if no solutions are found in time
					console.log(`failed to find solution in time for struct ${struct.id}`);
					break;
				}
			}
			// if (!success) console.log(`out of options for struct ${struct.id}...`);
		}
	// });
	}
	console.log('done');
}

function isAlreadyUsed(history, blacklist, struct) {
	for (let i = 0; i < history.length; i++) {
		if (struct.id === history[i].struct.id) return true;
	}
	for (let i = 0; i < blacklist.length; i++) {
		if (struct.id === blacklist[i]) return true;
	}
	return false;
}

function mergeHistoryAndBlacklist(history, blacklist) {
	let mergedArr = [];
	for (let i = 0; i < history.length; i++) {
		mergedArr.push(history[i].struct.id);
	}
	for (let i = 0; i < blacklist.length; i++) {
		mergedArr.push(blacklist[i]);
	}
	return mergedArr;
}

function getNoteCollisionFromDists(dists) {
	if (dists.xdist === 0 && dists.ydist < -1) return true; // TODO: Change to false and properly compute cell merging
	if (dists.xdist === 0 && dists.ydist === -1) return false;
	return (dists.xdist <= 0 && dists.ydist <= 0 && dists.xdist + dists.ydist < 0);
}

function shuffleArray(array) {
	let counter = array.length;
	while (counter > 0) {
		let index = Math.floor(Math.random() * counter);
		counter--;
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	return array;
}