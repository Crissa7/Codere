const { remote } = require("webdriverio");
const config = require("./login.json");

const capabilities = {
  platformName: "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "Android",
  "appium:appPackage": "spain.codere.apuestas",
  "appium:appActivity": ".MainActivity",
  "appium:disableIdLocatorAutocompletion": true,
};

const wdOpts = {
  hostname: "192.168.1.179",
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: "info",
  capabilities,
};

let driver;

async function waitSpinnerToHide() {
  const spinner = await driver.$(
    '//android.webkit.WebView[@text="Apuestas en Directo – Lo Mejor de España | Codere®"]/android.view.View/android.view.View[1]/android.view.View/android.view.View[1]/android.view.View'
  );
  await spinner.waitForDisplayed({ reverse: true, timeout: 10000 });
}

async function clickOnAcceptCookiesButton() {
  const acceptButton = await driver.$(
    '//android.widget.Button[@text="ACEPTAR"]'
  );
  await acceptButton.waitForDisplayed({ timeout: 60000 });
  await acceptButton.click();
}
async function waitForCookiesToBeHidden() {
  const dialog = await driver.$(
    '//android.app.Dialog[@text="Configuración de cookies"]'
  );
  await dialog.waitForDisplayed({ reverse: true, timeout: 10000 });
}

async function clickOnAccessButton() {
  const accederButton = await driver.$(
    '//android.widget.Button[@text="Acceder"]'
  );
  await accederButton.click();
}
async function clickOnAccessLogin() {
  const loginButton = await driver.$(
    '//android.widget.Button[@resource-id="btnaccess"]'
  );
  await loginButton.click();
}
async function invalidLogin(user, password) {
  const userTextField = await driver.$(
    '//android.widget.EditText[@hint = "Usuario / Correo electrónico"]'
  );
  await userTextField.waitForDisplayed();
  await userTextField.addValue(user);

  const passwordTextField = await driver.$(
    '//android.widget.EditText[@hint = "Contraseña"]'
  );
  await passwordTextField.waitForDisplayed();
  await passwordTextField.addValue(password);
  clickOnAccessLogin();
}

async function modalWrongLogin(expectedError) {
  const errorDialog = await driver.$(
    `//android.app.Dialog[@text="${expectedError}"]`
  );
  await errorDialog.waitForDisplayed({ timeout: 10000 });
}

async function clickOnOkButton() {
  const okDialog = await driver.$('//android.widget.Button[@text="OK"]');
  await okDialog.waitForDisplayed();
  await okDialog.click();
}

async function clickOnCloseModal() {
  const closeDialog = await driver.$('//android.widget.Button[@text="close"]');
  closeDialog.click();
}

async function runTest(testCase) {
  driver = await remote(wdOpts);
  await waitSpinnerToHide();
  await clickOnAcceptCookiesButton();
  await waitForCookiesToBeHidden();
  await clickOnAccessButton();
  await invalidLogin(testCase.user, testCase.password);
  await modalWrongLogin(testCase.expectedError);
  await clickOnOkButton();
  await clickOnCloseModal();
}

async function startTests() {
  for (let i = 0; i < config.length; i++) {
    await runTest(config[i]);
  }
  await driver.deleteSession();
}

startTests();
