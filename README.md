# Bye Bye Meta: Leaving Together

An interactive piece about what it would take for Brussels cultural institutions to leave Facebook and Instagram together. It was made as a LUCA School of Arts (Brussels) Master's project, using a survey of cultural workers.

**See it online:** <https://guevarajoge.github.io/LUCA-byebye_meta/>

Each of the 26 marks is one survey response to the question: *If a reliable local alternative existed and other Brussels institutions moved there too, would you leave Facebook and Instagram?* Holding **Make space elsewhere** opens a second gathering point. The responses move according to their answer, and the "maybe, if enough others did" responses stretch between the two fields. Each hold reveals one quote from the survey, and three buttons show the channels respondents already use instead of Meta.

## Why open source

The piece argues that leaving a platform is easier when you do it together. The code follows the same idea:

- **Leaving Meta needs shared tools, not just good intentions.** The survey shows that institutions already have alternatives (newsletters, listings, print). What they lack is a shared picture of who else would move. Anyone can reuse this piece to make that picture for their own sector or city.
- **No platform lock-in.** The piece is plain HTML, CSS and JavaScript with p5.js. It has no build step, account, tracking or paid service, and it runs on any static host. That matches what it argues for.
- **The method is open to checking.** The counts sit in the code as plain values, and the history of every version is in Git. Earlier versions stay online, so you can see how the piece changed.
- **Your data stays yours.** The piece only displays aggregate counts and quotes you choose to include. Nothing is sent anywhere.

## Run it on your computer

You need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) (any recent version).

```sh
git clone https://github.com/guevarajoge/LUCA-byebye_meta.git
cd LUCA-byebye_meta
node serve.js
```

Then open <http://localhost:8080/leaving-together.html>. The small server in `serve.js` only serves the files the pages use.

You can also skip Node and open the `docs/` folder with any static server, for example the Live Server extension in VS Code.

## Files

| File | What it is |
| --- | --- |
| `leaving-together.html`, `.js`, `.css` | The piece, for local work |
| `docs/` | The public copy served by GitHub Pages (`docs/index.html` is the piece) |
| `docs/vX.Y.Z/` | Frozen earlier versions |
| `index.html`, `survey.html`, `leaving-meta.html` | Earlier prototypes and a static chart |
| `serve.js` | Local server |

The local files and the `docs/` copy hold the same piece. When you change one, change the other. In `docs/`, use relative links (`./`, not `/`) so they work under the GitHub Pages path.

## Make your own version with different data

1. **Fork** the repository on GitHub, or clone it and push it to a new repository.
2. **Replace the data** in the places listed below.
3. **Check it** in the browser at desktop and phone width, with mouse, keyboard and touch.
4. **Publish** with GitHub Pages: in your repository's *Settings → Pages*, choose the `main` branch and the `/docs` folder.

### Where the data lives

In `leaving-together.js` (and the copy in `docs/`):

- **`groups`** at the top: one entry per answer, with its `label`, `count`, `color` and `shape`. `destination` sets where the marks go when the field opens (0 = stay, 1 = move, in between = stretch across). `distance` sets how widely they spread.
- **`quotes`**: the quotes, each tagged `Loss`, `Gain` or `Loss and gain`.
- **`RESPONSES`** and **`channels`**: the total number of responses and the channels respondents already use. `note` is optional extra text.
- A few fixed numbers you also need to change: the `26` in `initialRadius` and the canvas note `INCL. ALL 10 “MAYBE” RESPONSES` in the route drawing. Search the file for `26` and `MAYBE`.

In `leaving-together.html` and `docs/index.html`:

- The question and the framing line at the top.
- The platform counts (for example Instagram 25 · Facebook 23). They appear in the canvas labels in the JavaScript and in a hidden sentence for screen readers in the HTML. Change both.
- The four conclusions under *What the survey shows*.
- The non-response line (how many organisations were asked and how many replied).

### Handle survey data with care

- **Never publish raw exports.** Keep the CSV and JSON exports out of Git. Add their file names to `.gitignore` before your first commit. They contain individual responses.
- **Show only counts.** Don't show anything that links one person's answers to each other unless the respondents agreed to it.
- **Quote only with permission.** Use only answers whose authors allowed quoting. Replace names of people, institutions and places with brackets, for example `[an institution]`.
- **Respect what people agreed to.** If your survey asked whether answers could be used in totals, count only the answers that said yes.

## Built with

- [p5.js](https://p5js.org/) 2.3.4, loaded from a CDN
- Space Grotesk and IBM Plex Serif from Google Fonts

## License

The code is released under the [MIT License](LICENSE). You can reuse, change and share it, including in your own projects.

The survey content is **not** covered by that license. This includes the counts, the quotes and the conclusions. Respondents agreed to their answers appearing in this project only. To make your own version, replace them with your own data.
