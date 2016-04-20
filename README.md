# findme-react-native

A Softwareproject done at Fh Minden 2016

### Prerequisites

- NodeJs
- npm
- react-native

To install those run the following:

```bash
sudo apt-get install nodejs
sudo apt-get install npm
npm install -g react-native-cli
```

### Project setup

Clone the project by running the command

```bash
git clone *your repo url*
```

Then go into the newly created folder (cd) and run

```bash
npm install
```

This downloads all the needed dependencies.

To run the Application on your phone: open a second terminal, go into the folder and run

```bash
react-native start
```

From the first terminal you can then run

```bash
react-native run-android
```

It might happen that you get an error screen on first launch. To fix this run the following:

```bash
adb reverse tcp:8081 tcp:8081
```
