# Super-Mario-Maestro

A music level generator for _Super Mario Maker_ and _Super Mario Maker 2_.<br><br>

To run this on a local version, you should start the HTTP server with the `maeatro/` folder as its root.<br>
Then, enter the root URL to access the local server as `localhost:{port}/maeatro/index.html`.<br><br>

If the [`http-server`](https://www.npmjs.com/package/http-server) command does not work. 2 common options can be used.<br><br>
If Python is already installed, just run `python -m http.server`.<br><br>
Otherwise, with `npm`, just run `npm install -g http-server` to have this command globally and installed.<br><br>


You can always try opening `maestro/index.html` directly in your browser.<br>
**But**, some functionality might be broken due to CORS-related errors.<br><br><br>


If you would like to contribute to the project,<br>
&nbsp;&nbsp;&nbsp;&nbsp; please do not change the formatting of the code.<br>
It use a tabulation as a spacing.

On _Eclipse_ and _Visual Studio_, the tab spacing is there by default.<br>
But, on any _Jet Brains_ program, the spacing is 4 spaces by default.<br>
&nbsp;&nbsp;&nbsp;&nbsp; To update it, just go in `File->Setting` `Editor->Code Style`.<br>
&nbsp;&nbsp;&nbsp;&nbsp; Then, change `Scheme` from `default` to `project` to only apply it to this project.<br>
&nbsp;&nbsp;&nbsp;&nbsp; Finally, change on `Code Style`, the `HTML`, `Javascript` and `Typescript` parameter to:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `Use tab character` and `Smart tabs` to **checked**.<br><br><br>


The code formatting is handled by  ESLint on `maestro/.eslintrc.json`.<br><br>
````