#Chalk

Yet another [Redmine] time tracker.

The app is available on the chrome app store : https://chrome.google.com/webstore/detail/chalk/nlokibpabmehjmnkbfhmipfcleemfbnd

It allows users to choose a project, a task and monitor time by pressing play / pause.
Idle time is detected, the time recorded during idle state is stored and the user is asked what to do with this recorded time (save or discard).
To login, use the api key of your redmine account.

Users can update the task's status, tracker and can also send comments while recording.
The app is localized in french and english.
2 colors are available for the moment.
A small configuration panel is also available to switch themes, languages and default activity for time logging.

The frontend relies on [Foundation], the backend on [dijon] javascript DI micro framework.

## Installation

You will need [npm](http://www.npmjs.org) and [bower](http://bower.io) in order to be able to build the app. 
Once both are installed :

```bash
npm install
bower install
```

## Build

Grunt is used to build the app, the default action will move all the assets in the build folder and watch for changes.

`grunt` : Creates a test build in the /build folder that you can use as an unpackaged app in chrome

`grunt relase` : Will build and zip a new release file in the dist/ folder. The release version will be read from the package.json

`grunt clean` : Removes the  build/ and babel/ folders

## Contributing

Feel free to contribute if you have improvements in mind. However, I do not want this project to become an desktop version of redmine.

This app is built solely on the redmine API and does not rely on any server-side plugin, I would like to keep it this way. 

Translations can be found in the src/locales folder and are based on [i18next]. Feel free to bring your own.

## Libraries

Chalk is built with the help of these fabulous libs : 

- [dijon]
- [foundation]
- [animate-sass]
- [AmaranJS]
- [Ashe]
- [datatables]
- [fontawesome]
- [i18next]
- [jquery]
- [jquery.rest]
- [select2]

[Redmine]: http://www.redmine.org
[dijon]: https://github.com/creynders/dijon
[foundation]: http://foundation.zurb.com
[animate-sass]: https://github.com/tgdev/animate-sass
[AmaranJS]: http://hakanersu.github.io/AmaranJS/
[Ashe]: https://github.com/dfsq/Ashe
[datatables]: https://github.com/DataTables/DataTables
[fontawesome]: http://fontawesome.io
[i18next]: https://github.com/i18next/i18next
[jquery]: https://github.com/jquery/jquery
[jquery.rest]: https://github.com/jpillora/jquery.rest
[select2]: https://select2.github.io
