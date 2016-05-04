# findme-react-native

A Softwareproject done at Fh Minden in 2016

### Project setup (Windows)

##### Prerequisites

- [Git](https://git-scm.com/)
- [NodeJs](https://nodejs.org/en/)
- NPM (Included in the NodeJs installation)
- [Python 2.x](https://www.python.org/downloads/release/python-2711/)
  (Check "Add to PATH" when installing)
- [JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
  ([Add JAVA_HOME to your environment variables](https://confluence.atlassian.com/doc/setting-the-java_home-variable-in-windows-8895.html))
- [Android SDK or Android Studio](http://developer.android.com/sdk/index.html)
- react-native

To install react-native run the following:

```bash
npm install -g react-native
```

##### More on installation

You need some packages of the Android SDK to build the App.
To download those, start the SDK Manager (SDK Manager.exe) from the SDK folder
or from within Android Studio (Configure -> SDK Manager).  
The following packages are needed:

- build-tools 23.0.1
- latest SDK Tools
- latest SDK Plattform-tools
- Android 6.0 SDK Platform
- Android Support Repository
- Android Support Library
- Google Repository
- Google USB Driver (If needed)

#### Cloning and running

Clone the project by running the command:

```bash
git clone *your repo url*
```

Then go into the newly created folder (cd) and run:

```bash
npm install
```

This downloads all the needed dependencies.

Before running you have to tell Gradle (The build-system of Android) where to
look for the Android SDK. To do so, go into the `android` folder and create a
file named `local.properties`. Add `sdk.dir=C:\\Path\\To\\The\\SDK`.

You also need to setup ADB. (Android Debug Bridge) On your Phone, [activate the
developer settings](http://www.androidcentral.com/how-enable-developer-settings-android-42)
and check ADB Debugging. On your computer you need to [add ADB to your PATH](http://forum.xda-developers.com/showthread.php?t=1161779).

To run the Application on your phone: open a second terminal, go into the
project folder and run:

```bash
react-native start
```

From the first terminal you can then run:

```bash
react-native run-android
```

It might happen that you get an error screen on first launch. To fix this run
the following:

```bash
adb reverse tcp:8081 tcp:8081
```
