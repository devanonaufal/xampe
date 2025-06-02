# Tramkam setup guide (Expo version)

Tramkam is React Native template application.

Using expo and typescript language to develop mobile app for both iOS and Android.

## 1. Install Node

Go to <https://nodejs.org/en/download/>, download latest LTS version then install it.

## 2. Watchman

Follow the Watchman installation guide to compile and install Watchman from source.

<https://facebook.github.io/watchman/docs/install.html>

> Watchman is a tool by Facebook for watching changes in the filesystem. It is highly recommended you install it for better performance and increased compatibility in certain edge cases (translation: you may be able to get by without installing this, but your mileage may vary; installing this now may save you from a headache later).

## 3. Expo CLI

Assuming that you have Node 12 LTS or greater installed, you can use npm to install the Expo CLI command
line utility:

```c
  npm install -g expo-cli
```

## 4. Android development environment

Setting up your development environment can be somewhat tedious if you're new to Android development. If you're already familiar with Android development, there are a few things you may need to configure. In either case, please make sure to carefully follow the next few steps.

### 4.1. Install Android Studio

Download and install Android Studio. While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

- Android SDK
- Android SDK Platform
- Android Virtual Device

Then, click "Next" to install all of these components.

> If the checkboxes are grayed out, you will have a chance to install these components later on.

Once setup has finalized and you're presented with the Welcome screen, proceed to the next step.

### 4.2. Install the Android SDK

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 10 (Q) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

To do that, open Android Studio, click on "Configure" button and select "SDK Manager".

> The SDK Manager can also be found within the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK.

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 10 (Q) entry, then make sure the following items are checked:

- Android SDK Platform 29
- Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 29.0.2 is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

### 4.3. Configure the ANDROID_HOME environment variable

The React Native tools require some environment variables to be set up in order to build apps with native code.

Add the following lines to your $HOME/.bash_profile or $HOME/.bashrc (if you are using zsh then ~/.zprofile or ~/.zshrc) config file:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

> .bash_profile is specific to bash. If you're using another shell, you will need to edit the appropriate shell-specific config file.

Type source $HOME/.bash_profile for bash or source $HOME/.zprofile to load the config into your current shell. Verify that ANDROID_HOME has been set by running echo $ANDROID_HOME and the appropriate directories have been added to your path by running echo $PATH.

> Please make sure you use the correct Android SDK path. You can find the actual location of the SDK in the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK.

## 5. iOS development environment

You will need Node, Watchman, the React Native command line interface, Xcode and CocoaPods.

While you can use any editor of your choice to develop your app, you will need to install Xcode in order to set up the necessary tooling to build your React Native app for iOS.

### 5.1. Xcode

The easiest way to install Xcode is via the Mac App Store. Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

If you have already installed Xcode on your system, make sure it is version 10 or newer.

### 5.2. Command Line Tools

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

### 5.3. Installing an iOS Simulator in Xcode

To install a simulator, open Xcode > Preferences... and select the Components tab. Select a simulator with the corresponding version of iOS you wish to use.

## 6. Environment confirmation

In Expo template application, please setup environment follow Expo environment setup guide first.

https://docs.timistudio.dev/docs/environment-setup/expo-environment-setup

Then to confirm all setup is ok, please execute command below to verify.

```bash
  $ yarn -v
  1.22.17
  $ node -v
  v14.17.5
  $ npm -v
  6.14.14
  $ expo --version
  5.0.3
```

If you are using MacOS and work with iOS, please check your XCode is latest version.

```bash
  $ /usr/bin/xcodebuild -version
  Xcode 13.2.1
  Build version 13C100
```

## 6. Run for development

```bash
cd <react-native-project-root>
yarn install
```

If you are using npm without yarn

```bash
cd <react-native-project-root>
npm install
```

Finally start simulator with command below

```bash
yarn android
# or
yarn ios
```

If you are using npm without yarn

```bash
npm run android
# or
npm run ios
```

<div style="page-break-after: always;"></div>

# 7. File structure

```c
- src/assets/                                     # Image asset files
- src/components/                                 # React Components
- src/constants/                                  # Project constant files
- src/hooks/                                      # React hooks
- src/navigation/                                 # React native navigation
- src/screens/                                    # Project screens
- src/utils/                                      # Helper files
- App.tsx
- app.json
- babel.config.js
- package.json                                # Node packages
- tsconfig.json                               # Typescript config
```

## SUPPORT INFORMATION

Thank for your purchase, feel free to contact with us if you have any trouble when install application.

- Email: admin@timistudio.dev
- Facebook official fanpage: <https://www.facebook.com/timistudio.dev>
