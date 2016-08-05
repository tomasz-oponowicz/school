import chai from "chai";
import webdriver from "selenium-webdriver";

chai.should();

const BASE_URL = process.env.BASE_URL || 'https://radiant-inferno-2296.firebaseapp.com';
const By = webdriver.By;
const until = webdriver.until;

describe('School', () => {
  let driver;

  before(() => {
    driver = new webdriver.Builder().forBrowser('firefox').build();
  });

  after(done => {
    driver.quit()
      .then(() => done());
  });

  describe('Home', () => {
    it('should render', done => {
      driver.get(`${BASE_URL}/`)
        .then(() => driver.getTitle())
        .then((title) => title.should.equal('School'))
        .then(() => done())
        .catch(error => done(error));
    });
  });

  describe('Sign In', () => {
    it('should be redirected if unauthenticated', done => {
      driver.get(`${BASE_URL}/lessons`)
        .then(() => driver.wait(until.elementLocated(By.id("email"))))
        .then(() => driver.findElement(By.id("email")))
        .then(() => driver.findElement(By.id("password")))
        .then(() => done())
        .catch(error => done(error));
    });

    it('should be able to sign in', done => {
      driver.get(`${BASE_URL}/`)
        .then(() => driver.wait(until.elementLocated(By.id("email"))))
        .then(() => driver.findElement(By.id("email")))
        .then(el => el.sendKeys('student@mailinator.com'))
        .then(() => driver.findElement(By.id("password")))
        .then(el => el.sendKeys('student'))
        .then(() => driver.findElement(By.className('btn-primary')))
        .then(el => el.click())
        .then(() => driver.wait(until.elementLocated(By.linkText('Lessons'))))
        .then(() => done())
        .catch(error => done(error));
    });
  });
});
