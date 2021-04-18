# Images

[Demo page](https://elcodex.github.io/images/build/index.html)

React application to display user's images.

`#react` `#react context` `#hooks` `#less` `#jest` `#webpack` `#html`

## Main code structure:

- `store`: React Context store, actions for append, delete images, update screen width.
- `logic`: application logic,
- `components`: React components with styles,
- `css`: shared styles (variables, form controls),
- `data`: example files.

## Details

- rows logic: all images in a row have the same height and proportionally scaled width, rows are updated when screen width is changed or new image is added,
- image URL input, key `Enter` or `Add` button to add image URL (images only, not JSON),
- `Upload` button: select files from files dialog (`image/*` or `json`),
- `Clear` button: delete all images (with confirmation),
- `Remove mode` checkbox: every image has a button `Remove` when this mode is checked,
- drop zone: user can drop files here.

### Files types:

- images (JPEG, PNG, etc),
- JSON files with the following structure:
```
{
    galleryImages: [
        { url: string, width?: number, height?: number },
        ...
    ]
}
```

### Application restrictions:

- screen: maximum width = 860px,
- images row: maximum height = 350px.

### Project is bundled with webpack. Commands:

- `npm run start` - bundle and start webpack server (`mode: "development"`),
- `npm run build` - create production build in folder `build`,
- `npm run test` - run unit tests.
