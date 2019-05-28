![Labmbe-Lambe](https://github.com/PedroPauloML/react-lambe/blob/master/assets/imgs/icon.png?raw=true)

# Lambe Lambe
### Getting start
To install dependencies run: ```npm i```

### Build .apk
References: [Generating signed apk](https://facebook.github.io/react-native/docs/0.56/signed-apk-android)

1. Generating a signing key
	- Run on console: ```$ cd $JAVA_HOME && sudo keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000```.
2. Setting up gradle variables
	- Place `my-release-key.keystore` into projet folder in `.../android/app`;
	- Edit `.../android/gradle.properties` (replace `*****` with the correct keystore password, alias and key password):
		> MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
		> MYAPP_RELEASE_KEY_ALIAS=my-key-alias
		> MYAPP_RELEASE_STORE_PASSWORD=*****
		> MYAPP_RELEASE_KEY_PASSWORD=*****
		
3. Add signing config to your app's gradle config
	- Edit the file `android/app/build.gradle`:
	    > ```...
	    > android {
	    >     ...
	    >     defaultConfig { ... }
	    >     signingConfigs {
	    >         release {
	    >             if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
	    >                 storeFile file(MYAPP_RELEASE_STORE_FILE)
	    >                 storePassword MYAPP_RELEASE_STORE_PASSWORD
	    >                 keyAlias MYAPP_RELEASE_KEY_ALIAS
	    >                 keyPassword MYAPP_RELEASE_KEY_PASSWORD
	    >             }
	    >         }
	    >     }
	    >     buildTypes {
	    >         release {
	    >             ...
	    >             signingConfig signingConfigs.release
	    >         }
	    >     }
	    > }
	    > ...
4. Generating the release APK
	- Run on project base path: ```$ cd android && ./gradlew assembleRelease```;
	- The generated APK can be found under `.../android/app/build/outputs/apk/release/app-release.apk`, and is ready to be distributed.
5. Testing the release build of your app
	- First uninstall any previous version of the app you already have installed. Install it on the device using: `$ react-native run-android --variant=release`.

### Notes
Files to add permission to use device native resources:
- AndroidManifest.xml [```lambe/android/app/src/main/AndroidManifest.xml```]
- Info.plist [```lambe/ios/lambe/Info.plist```]