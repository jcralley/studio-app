import { MyTodoList } from '../../src/components/my-todo-list';

// Register the component
import '../../src/components/my-todo-list';

QUnit.module('MyTodoList Component', function (hooks) {
  let element: MyTodoList;
  let container: HTMLElement;

  hooks.beforeEach(function () {
    // Create a container for our test element
    container = document.createElement('div');
    document.body.appendChild(container);

    // Create the todo list element
    element = document.createElement('my-todo-list') as MyTodoList;
    container.appendChild(element);

    // Wait for the element to be fully initialized
    return new Promise(resolve => {
      setTimeout(resolve, 10);
    });
  });

  hooks.afterEach(function () {
    // Clean up
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  QUnit.module('Initial State', function () {
    QUnit.test('should render with default todos', function (assert) {
      const todoItems = element.shadowRoot?.querySelectorAll('.todo-item');
      assert.equal(todoItems?.length, 2, 'Should have 2 initial todos');

      const todoTexts = Array.from(todoItems || []).map(item =>
        item.querySelector('.todo-text')?.textContent?.trim()
      );
      assert.ok(todoTexts.includes('Learn Lit web components'), 'Should include first default todo');
      assert.ok(todoTexts.includes('Build awesome apps'), 'Should include second default todo');
    });

    QUnit.test('should display the correct initial stats', function (assert) {
      const statsElement = element.shadowRoot?.querySelector('.todo-stats');
      assert.ok(statsElement, 'Stats element should exist');

      const statsText = statsElement?.textContent || '';
      assert.ok(statsText.includes('Total: 2'), 'Should show total of 2');
      assert.ok(statsText.includes('Completed: 0'), 'Should show 0 completed');
      assert.ok(statsText.includes('Remaining: 2'), 'Should show 2 remaining');
    });

    QUnit.test('should have an empty input field initially', function (assert) {
      const input = element.shadowRoot?.querySelector('.todo-input') as HTMLInputElement;
      assert.ok(input, 'Input element should exist');
      assert.equal(input?.value, '', 'Input should be empty initially');
    });

    QUnit.test('should have a disabled add button initially', function (assert) {
      const button = element.shadowRoot?.querySelector('.add-button') as HTMLButtonElement;
      assert.ok(button, 'Add button should exist');
      assert.ok(button?.disabled, 'Add button should be disabled initially');
    });
  });

  QUnit.module('Adding Todos', function () {
    QUnit.test('should enable add button when input has text', async function (assert) {
      const input = element.shadowRoot?.querySelector('.todo-input') as HTMLInputElement;
      const button = element.shadowRoot?.querySelector('.add-button') as HTMLButtonElement;

      input.value = 'New todo';
      input.dispatchEvent(new Event('input'));

      // Wait for component to update
      await new Promise(resolve => setTimeout(resolve, 10));

      assert.notOk(button?.disabled, 'Add button should be enabled when input has text');
    });

    QUnit.test('should add a new todo when add button is clicked', async function (assert) {
      const input = element.shadowRoot?.querySelector('.todo-input') as HTMLInputElement;
      const button = element.shadowRoot?.querySelector('.add-button') as HTMLButtonElement;

      input.value = 'New todo item';
      input.dispatchEvent(new Event('input'));
      await new Promise(resolve => setTimeout(resolve, 10));

      button.click();
      await new Promise(resolve => setTimeout(resolve, 10));

      const todoItems = element.shadowRoot?.querySelectorAll('.todo-item');
      assert.equal(todoItems?.length, 3, 'Should have 3 todos after adding one');

      const lastTodo = todoItems?.[2].querySelector('.todo-text');
      assert.equal(lastTodo?.textContent?.trim(), 'New todo item', 'New todo should have correct text');
    });

    QUnit.test('should clear input after adding todo', async function (assert) {
      const input = element.shadowRoot?.querySelector('.todo-input') as HTMLInputElement;
      const button = element.shadowRoot?.querySelector('.add-button') as HTMLButtonElement;

      input.value = 'Test todo';
      input.dispatchEvent(new Event('input'));
      await new Promise(resolve => setTimeout(resolve, 10));

      button.click();
      await new Promise(resolve => setTimeout(resolve, 10));

      assert.equal(input.value, '', 'Input should be cleared after adding todo');
    });

    QUnit.test('should add todo when Enter key is pressed', async function (assert) {
      const input = element.shadowRoot?.querySelector('.todo-input') as HTMLInputElement;

      input.value = 'Todo via Enter';
      input.dispatchEvent(new Event('input'));
      await new Promise(resolve => setTimeout(resolve, 10));

      const enterEvent = new KeyboardEvent('keypress', { key: 'Enter' });
      input.dispatchEvent(enterEvent);
      await new Promise(resolve => setTimeout(resolve, 10));

      const todoItems = element.shadowRoot?.querySelectorAll('.todo-item');
      assert.equal(todoItems?.length, 3, 'Should add todo when Enter is pressed');
    });

    QUnit.test('should not add empty todos', async function (assert) {
      const input = element.shadowRoot?.querySelector('.todo-input') as HTMLInputElement;
      const button = element.shadowRoot?.querySelector('.add-button') as HTMLButtonElement;

      input.value = '   '; // whitespace only
      input.dispatchEvent(new Event('input'));
      await new Promise(resolve => setTimeout(resolve, 10));

      button.click();
      await new Promise(resolve => setTimeout(resolve, 10));

      const todoItems = element.shadowRoot?.querySelectorAll('.todo-item');
      assert.equal(todoItems?.length, 2, 'Should not add empty todos');
    });

    QUnit.test('should trim whitespace from new todos', async function (assert) {
      const input = element.shadowRoot?.querySelector('.todo-input') as HTMLInputElement;
      const button = element.shadowRoot?.querySelector('.add-button') as HTMLButtonElement;

      input.value = '  Trimmed todo  ';
      input.dispatchEvent(new Event('input'));
      await new Promise(resolve => setTimeout(resolve, 10));

      button.click();
      await new Promise(resolve => setTimeout(resolve, 10));

      const todoItems = element.shadowRoot?.querySelectorAll('.todo-item');
      const lastTodo = todoItems?.[2]?.querySelector('.todo-text');
      assert.equal(lastTodo?.textContent?.trim(), 'Trimmed todo', 'Should trim whitespace from new todos');
    });
  });

  QUnit.module('Completing Todos', function () {
    QUnit.test('should toggle todo completion when checkbox is clicked', async function (assert) {
      const firstCheckbox = element.shadowRoot?.querySelector('.todo-checkbox') as HTMLInputElement;
      const firstTodoText = element.shadowRoot?.querySelector('.todo-text');

      assert.notOk(firstCheckbox?.checked, 'Checkbox should not be checked initially');
      assert.notOk(firstTodoText?.classList.contains('completed'), 'Todo should not have completed class initially');

      firstCheckbox.click();
      await new Promise(resolve => setTimeout(resolve, 10));

      assert.ok(firstCheckbox?.checked, 'Checkbox should be checked after clicking');
      assert.ok(firstTodoText?.classList.contains('completed'), 'Todo should have completed class after checking');
    });

    QUnit.test('should update stats when todo is completed', async function (assert) {
      const firstCheckbox = element.shadowRoot?.querySelector('.todo-checkbox') as HTMLInputElement;

      firstCheckbox.click();
      await new Promise(resolve => setTimeout(resolve, 10));

      const statsElement = element.shadowRoot?.querySelector('.todo-stats');
      const statsText = statsElement?.textContent || '';
      assert.ok(statsText.includes('Completed: 1'), 'Should show 1 completed');
      assert.ok(statsText.includes('Remaining: 1'), 'Should show 1 remaining');
    });

    QUnit.test('should toggle completion state back and forth', async function (assert) {
      const firstCheckbox = element.shadowRoot?.querySelector('.todo-checkbox') as HTMLInputElement;
      const firstTodoText = element.shadowRoot?.querySelector('.todo-text');

      // Complete the todo
      firstCheckbox.click();
      await new Promise(resolve => setTimeout(resolve, 10));
      assert.ok(firstCheckbox?.checked, 'Should be checked after first click');
      assert.ok(firstTodoText?.classList.contains('completed'), 'Should have completed class');

      // Uncomplete the todo
      firstCheckbox.click();
      await new Promise(resolve => setTimeout(resolve, 10));
      assert.notOk(firstCheckbox?.checked, 'Should not be checked after second click');
      assert.notOk(firstTodoText?.classList.contains('completed'), 'Should not have completed class');
    });
  });

  QUnit.module('Deleting Todos', function () {
    QUnit.test('should delete todo when delete button is clicked', async function (assert) {
      const initialCount = element.shadowRoot?.querySelectorAll('.todo-item').length;
      assert.equal(initialCount, 2, 'Should start with 2 todos');

      const firstDeleteButton = element.shadowRoot?.querySelector('.delete-button') as HTMLButtonElement;
      firstDeleteButton.click();
      await new Promise(resolve => setTimeout(resolve, 10));

      const finalCount = element.shadowRoot?.querySelectorAll('.todo-item').length;
      assert.equal(finalCount, 1, 'Should have 1 todo after deletion');
    });

    QUnit.test('should update stats after deleting todo', async function (assert) {
      const firstDeleteButton = element.shadowRoot?.querySelector('.delete-button') as HTMLButtonElement;
      firstDeleteButton.click();
      await new Promise(resolve => setTimeout(resolve, 10));

      const statsElement = element.shadowRoot?.querySelector('.todo-stats');
      const statsText = statsElement?.textContent || '';
      assert.ok(statsText.includes('Total: 1'), 'Should show total of 1');
      assert.ok(statsText.includes('Remaining: 1'), 'Should show 1 remaining');
    });

    QUnit.test('should show empty state when all todos are deleted', async function (assert) {
      // Delete both default todos
      let deleteButton = element.shadowRoot?.querySelector('.delete-button') as HTMLButtonElement;
      deleteButton.click();
      await new Promise(resolve => setTimeout(resolve, 10));

      deleteButton = element.shadowRoot?.querySelector('.delete-button') as HTMLButtonElement;
      deleteButton.click();
      await new Promise(resolve => setTimeout(resolve, 10));

      const emptyState = element.shadowRoot?.querySelector('.empty-state');
      assert.ok(emptyState, 'Empty state should be visible');
      assert.equal(emptyState?.textContent?.trim(), 'No todos yet. Add one above!', 'Should show correct empty message');

      const todoList = element.shadowRoot?.querySelector('.todo-list');
      assert.notOk(todoList, 'Todo list should not exist when empty');
    });
  });

  QUnit.module('Stats Calculation', function () {
    QUnit.test('should show correct stats with mixed completion states', async function (assert) {
      // Add a new todo
      const input = element.shadowRoot?.querySelector('.todo-input') as HTMLInputElement;
      const button = element.shadowRoot?.querySelector('.add-button') as HTMLButtonElement;

      input.value = 'Third todo';
      input.dispatchEvent(new Event('input'));
      await new Promise(resolve => setTimeout(resolve, 10));
      button.click();
      await new Promise(resolve => setTimeout(resolve, 10));

      // Complete one todo
      const firstCheckbox = element.shadowRoot?.querySelector('.todo-checkbox') as HTMLInputElement;
      firstCheckbox.click();
      await new Promise(resolve => setTimeout(resolve, 10));

      const statsElement = element.shadowRoot?.querySelector('.todo-stats');
      const statsText = statsElement?.textContent || '';
      assert.ok(statsText.includes('Total: 3'), 'Should show total of 3');
      assert.ok(statsText.includes('Completed: 1'), 'Should show 1 completed');
      assert.ok(statsText.includes('Remaining: 2'), 'Should show 2 remaining');
    });
  });

  QUnit.module('Component Structure', function () {
    QUnit.test('should have proper semantic structure', function (assert) {
      const header = element.shadowRoot?.querySelector('h3');
      assert.equal(header?.textContent?.trim(), 'Todo List Component', 'Should have correct header text');

      const todoHeader = element.shadowRoot?.querySelector('.todo-header');
      assert.ok(todoHeader, 'Should have todo header element');

      const todoList = element.shadowRoot?.querySelector('.todo-list');
      assert.equal(todoList?.tagName.toLowerCase(), 'ul', 'Todo list should be a ul element');
    });

    QUnit.test('should have proper accessibility attributes', function (assert) {
      const input = element.shadowRoot?.querySelector('.todo-input') as HTMLInputElement;
      assert.equal(input?.placeholder, 'add a new todo...', 'Input should have correct placeholder');

      const checkboxes = element.shadowRoot?.querySelectorAll('.todo-checkbox');
      assert.ok(checkboxes && checkboxes.length > 0, 'Should have checkboxes');

      checkboxes?.forEach((checkbox, index) => {
        assert.equal((checkbox as HTMLInputElement).type, 'checkbox', `Checkbox ${index} should have correct type`);
      });
    });
  });

  QUnit.module('Error Handling', function () {
    QUnit.test('should handle invalid input gracefully', async function (assert) {
      const input = element.shadowRoot?.querySelector('.todo-input') as HTMLInputElement;
      const button = element.shadowRoot?.querySelector('.add-button') as HTMLButtonElement;

      // Try to add empty content
      input.value = '';
      input.dispatchEvent(new Event('input'));
      await new Promise(resolve => setTimeout(resolve, 10));

      const initialCount = element.shadowRoot?.querySelectorAll('.todo-item').length;
      button.click();
      await new Promise(resolve => setTimeout(resolve, 10));

      const finalCount = element.shadowRoot?.querySelectorAll('.todo-item').length;
      assert.equal(finalCount, initialCount, 'Should not add empty todos');
    });
  });

  QUnit.module('Toggle Todo Method Tests', function () {
    QUnit.test('should toggle todo state from false to true', async function (assert) {
      // Get the initial state - first todo should be incomplete
      const initialTodos = (element as any)._todos;
      const firstTodo = initialTodos[0];
      assert.equal(firstTodo.completed, false, 'First todo should start as incomplete');
      
      // Call _toggleTodo directly
      (element as any)._toggleTodo(firstTodo.id);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Check that the todo state changed
      const updatedTodos = (element as any)._todos;
      const updatedFirstTodo = updatedTodos.find((t: any) => t.id === firstTodo.id);
      assert.equal(updatedFirstTodo.completed, true, 'First todo should be completed after toggle');
    });

    QUnit.test('should toggle todo state from true to false', async function (assert) {
      // First, complete a todo
      const initialTodos = (element as any)._todos;
      const firstTodo = initialTodos[0];
      (element as any)._toggleTodo(firstTodo.id);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Verify it's completed
      let updatedTodos = (element as any)._todos;
      let updatedFirstTodo = updatedTodos.find((t: any) => t.id === firstTodo.id);
      assert.equal(updatedFirstTodo.completed, true, 'Todo should be completed first');
      
      // Now toggle it back
      (element as any)._toggleTodo(firstTodo.id);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Check that it's incomplete again
      updatedTodos = (element as any)._todos;
      updatedFirstTodo = updatedTodos.find((t: any) => t.id === firstTodo.id);
      assert.equal(updatedFirstTodo.completed, false, 'Todo should be incomplete after second toggle');
    });

    QUnit.test('should only toggle the specified todo', async function (assert) {
      const initialTodos = (element as any)._todos;
      const firstTodo = initialTodos[0];
      const secondTodo = initialTodos[1];
      
      // Toggle only the first todo
      (element as any)._toggleTodo(firstTodo.id);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const updatedTodos = (element as any)._todos;
      const updatedFirstTodo = updatedTodos.find((t: any) => t.id === firstTodo.id);
      const updatedSecondTodo = updatedTodos.find((t: any) => t.id === secondTodo.id);
      
      assert.equal(updatedFirstTodo.completed, true, 'First todo should be completed');
      assert.equal(updatedSecondTodo.completed, false, 'Second todo should remain incomplete');
    });

    QUnit.test('should not affect other todo properties', async function (assert) {
      const initialTodos = (element as any)._todos;
      const firstTodo = initialTodos[0];
      const originalText = firstTodo.text;
      const originalId = firstTodo.id;
      
      // Toggle the todo
      (element as any)._toggleTodo(firstTodo.id);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const updatedTodos = (element as any)._todos;
      const updatedFirstTodo = updatedTodos.find((t: any) => t.id === firstTodo.id);
      
      assert.equal(updatedFirstTodo.text, originalText, 'Todo text should remain unchanged');
      assert.equal(updatedFirstTodo.id, originalId, 'Todo id should remain unchanged');
      assert.equal(updatedFirstTodo.completed, true, 'Only completed status should change');
    });

    QUnit.test('should handle non-existent todo id gracefully', async function (assert) {
      const initialTodos = (element as any)._todos;
      const initialLength = initialTodos.length;
      const nonExistentId = 999;
      
      // Try to toggle a non-existent todo
      (element as any)._toggleTodo(nonExistentId);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const updatedTodos = (element as any)._todos;
      
      // Verify no todos were affected
      assert.equal(updatedTodos.length, initialLength, 'Todo array length should remain the same');
      updatedTodos.forEach((todo: any, index: number) => {
        assert.equal(todo.completed, initialTodos[index].completed, `Todo ${index} completion state should be unchanged`);
      });
    });
  });

  QUnit.module('Visual Toggle Integration', function () {
    QUnit.test('should apply completed class when todo is toggled via method', async function (assert) {
      const firstTodo = (element as any)._todos[0];
      
      // Toggle via the method
      (element as any)._toggleTodo(firstTodo.id);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Check that the UI reflects the change
      const firstTodoText = element.shadowRoot?.querySelector('.todo-text');
      const firstCheckbox = element.shadowRoot?.querySelector('.todo-checkbox') as HTMLInputElement;
      
      assert.ok(firstTodoText?.classList.contains('completed'), 'Todo text should have completed class');
      assert.ok(firstCheckbox?.checked, 'Checkbox should be checked');
    });

    QUnit.test('should remove completed class when todo is toggled back', async function (assert) {
      const firstTodo = (element as any)._todos[0];
      
      // Toggle to completed
      (element as any)._toggleTodo(firstTodo.id);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Toggle back to incomplete
      (element as any)._toggleTodo(firstTodo.id);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Check that the UI reflects the change
      const firstTodoText = element.shadowRoot?.querySelector('.todo-text');
      const firstCheckbox = element.shadowRoot?.querySelector('.todo-checkbox') as HTMLInputElement;
      
      assert.notOk(firstTodoText?.classList.contains('completed'), 'Todo text should not have completed class');
      assert.notOk(firstCheckbox?.checked, 'Checkbox should not be checked');
    });

    QUnit.test('should update stats when toggled via method', async function (assert) {
      const firstTodo = (element as any)._todos[0];
      
      // Toggle to completed
      (element as any)._toggleTodo(firstTodo.id);
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const statsElement = element.shadowRoot?.querySelector('.todo-stats');
      const statsText = statsElement?.textContent || '';
      
      assert.ok(statsText.includes('Completed: 1'), 'Stats should show 1 completed');
      assert.ok(statsText.includes('Remaining: 1'), 'Stats should show 1 remaining');
    });
  });

  QUnit.module('CSS Classes', function () {
    QUnit.test('should apply completed class to completed todos', async function (assert) {
      const firstCheckbox = element.shadowRoot?.querySelector('.todo-checkbox') as HTMLInputElement;
      const firstTodoText = element.shadowRoot?.querySelector('.todo-text');

      assert.notOk(firstTodoText?.classList.contains('completed'), 'Should not have completed class initially');

      firstCheckbox.click();
      await new Promise(resolve => setTimeout(resolve, 10));

      assert.ok(firstTodoText?.classList.contains('completed'), 'Should have completed class after checking');
    });

    QUnit.test('should have proper CSS classes on elements', function (assert) {
      const expectedClasses = [
        '.todo-header',
        '.todo-input',
        '.add-button',
        '.todo-list',
        '.todo-item',
        '.todo-checkbox',
        '.todo-text',
        '.delete-button',
        '.todo-stats'
      ];

      expectedClasses.forEach(className => {
        const elementWithClass = element.shadowRoot?.querySelector(className);
        assert.ok(elementWithClass, `Element with class ${className} should exist`);
      });
    });
  });
});
