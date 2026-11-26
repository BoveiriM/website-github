# Mohamad Boveiri · Research & Notes

This repository serves the static academic website at https://boveirim.github.io/website-github/. It contains plain HTML, CSS and JavaScript, so no build step is required.

For local preview, put these files in a folder named `website-github`. Run `python3 -m http.server 8000` from its parent folder and open http://localhost:8000/website-github/. For GitHub Pages, use **Deploy from a branch** with **main** and **/ (root)**. Keep `.nojekyll` so GitHub serves the files directly.

The homepage is `index.html`. Research, publications, profile and notes are in their named folders. The publications page links to the BibTeX file at `publications.bib`.
