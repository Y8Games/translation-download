# Translation Downloader

### Preparing a new Project

Start by going through your project and collecting all default English phrases.

Create a json formated file with all the phrases and words.

Note, mixing and match different translations won't work well. Instead use replacable strings.

See the following json example.

``` json

{
  "game_title.main_menu.plau_btn": "PLAY",
  "game_title.play.tutorial": "You will be give %{num1} rings and %{num2} stones.",
  "game_title.health": "health: %{num1}"
}

```

In the project code, replace the strings. The following is one way to do this in javascript.


``` javascript
translation.replace('%{num1}', numberVar)
```

### Downloading Translations

1. Download and install node.js https://nodejs.org/en/download/
2. Update the config.json file as needed
3. Download dependancies with `npm install`
4. Using a command line, navigate to this folder and run  `node download.js`

### Translation Files

>th.json

``` json
{
    "all": {
        "game_title.attack": "โจมตี",
        "game_title.bonus_today": "วันนี้",
        "game_title.btn_play": "เล่น"
    }
}
```