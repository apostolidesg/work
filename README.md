# Kino application for SSBTs

## Environment configuration/override
In order to override the default configuration of the application depending on the environment, a .kinoconfig file must be 
created under C:/ directory. The file should contain the configuration that should be overridden in JSON format. Please consult 
[Electron Application README](electron-app/README.md) and
[Vue application README](vue-app/README.md) for addition information on the available configuration.

A configuration example is the following:
```json
{
	"electron": {
		"appAlwaysOnTop":true
		},
	"vue":{
		"PAM_HOST": "ssa2.betware.com"
	}
}
```
You can provide only the configuration fields that you want to be changed.