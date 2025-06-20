import { MyCard } from '../../src/components/my-card';
import '../../src/components/my-card';

QUnit.module('MyCard Component', function () {

  QUnit.test('should create card with default properties', function (assert) {
    const card = new MyCard();
    assert.equal(card.title, '', 'Default title should be empty');
    assert.equal(card.subtitle, '', 'Default subtitle should be empty');
    assert.equal(card.elevated, false, 'Default elevated should be false');
  });

  QUnit.test('should render card without header when no title or subtitle', async function (assert) {
    const done = assert.async();

    try {
      const card = document.createElement('my-card') as MyCard;
      document.body.appendChild(card);

      await card.updateComplete;

      const header = card.shadowRoot?.querySelector('.header');
      assert.ok(!header, 'Header should not exist when no title or subtitle');

      const content = card.shadowRoot?.querySelector('.content');
      assert.ok(content, 'Content area should exist');

      document.body.removeChild(card);
      done();
    } catch (error) {
      assert.ok(false, `Test failed with error: ${error}`);
      done();
    }
  });

  QUnit.test('should render header with title when title is provided', async function (assert) {
    const done = assert.async();

    try {
      const card = document.createElement('my-card') as MyCard;
      card.title = 'Test Title';
      document.body.appendChild(card);

      await card.updateComplete;

      const header = card.shadowRoot?.querySelector('.header');
      const title = card.shadowRoot?.querySelector('.title');

      assert.ok(header, 'Header should exist when title is provided');
      assert.ok(title, 'Title element should exist');
      assert.equal(title?.textContent, 'Test Title', 'Title should display correct text');

      document.body.removeChild(card);
      done();
    } catch (error) {
      assert.ok(false, `Test failed with error: ${error}`);
      done();
    }
  });

  QUnit.test('should render header with subtitle when subtitle is provided', async function (assert) {
    const done = assert.async();

    try {
      const card = document.createElement('my-card') as MyCard;
      card.subtitle = 'Test Subtitle';
      document.body.appendChild(card);

      await card.updateComplete;

      const header = card.shadowRoot?.querySelector('.header');
      const subtitle = card.shadowRoot?.querySelector('.subtitle');

      assert.ok(header, 'Header should exist when subtitle is provided');
      assert.ok(subtitle, 'Subtitle element should exist');
      assert.equal(subtitle?.textContent, 'Test Subtitle', 'Subtitle should display correct text');

      document.body.removeChild(card);
      done();
    } catch (error) {
      assert.ok(false, `Test failed with error: ${error}`);
      done();
    }
  });

  QUnit.test('should render both title and subtitle when both are provided', async function (assert) {
    const done = assert.async();

    try {
      const card = document.createElement('my-card') as MyCard;
      card.title = 'Main Title';
      card.subtitle = 'Secondary Text';
      document.body.appendChild(card);

      await card.updateComplete;

      const title = card.shadowRoot?.querySelector('.title');
      const subtitle = card.shadowRoot?.querySelector('.subtitle');

      assert.ok(title, 'Title element should exist');
      assert.ok(subtitle, 'Subtitle element should exist');
      assert.equal(title?.textContent, 'Main Title', 'Title should be correct');
      assert.equal(subtitle?.textContent, 'Secondary Text', 'Subtitle should be correct');

      document.body.removeChild(card);
      done();
    } catch (error) {
      assert.ok(false, `Test failed with error: ${error}`);
      done();
    }
  });

  QUnit.test('should apply elevated class when elevated property is true', async function (assert) {
    const done = assert.async();

    try {
      const card = document.createElement('my-card') as MyCard;
      card.elevated = true;
      document.body.appendChild(card);

      await card.updateComplete;

      const cardElement = card.shadowRoot?.querySelector('.card');
      assert.ok(cardElement?.classList.contains('elevated'), 'Card should have elevated class');

      document.body.removeChild(card);
      done();
    } catch (error) {
      assert.ok(false, `Test failed with error: ${error}`);
      done();
    }
  });

  QUnit.test('should have slot for content', async function (assert) {
    const done = assert.async();

    try {
      const card = document.createElement('my-card') as MyCard;
      card.innerHTML = '<p>Test content</p>';
      document.body.appendChild(card);

      await card.updateComplete;

      const slot = card.shadowRoot?.querySelector('slot');
      assert.ok(slot, 'Slot should exist for content');

      const content = card.querySelector('p');
      assert.ok(content, 'Slotted content should exist');
      assert.equal(content?.textContent, 'Test content', 'Slotted content should be correct');

      document.body.removeChild(card);
      done();
    } catch (error) {
      assert.ok(false, `Test failed with error: ${error}`);
      done();
    }
  });
});
