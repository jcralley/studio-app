import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean
}

@customElement('my-todo-list')
export class MyTodoList extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      margin: 16px 0;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #fff;
    }

    .todo-header {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .todo-input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px; 
    }

    .add-button {
      padding: 8px 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    .add-button:hover {
      background-color: #45A049;
    }

    .add-button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    .todo-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .todo-item {
      display: flex;
      align-items: center;
      padding: 12px;
      border-bottom: 1px solid #eee;
      gap: 12px;
    }

    .todo-item:last-child {
      border-bottom: none;
    }

    .todo-checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .todo-text {
      flex: 1;
      font-size: 16px;
      transition: all 0.2s;
    }

    .todo-text.completed {
      text-decoration: line-through;
      color: #888;
    }

    .delete-button {
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 4px 8px;
      cursor: pointer;
      font-size: 12px;
    }

    .delete-button:hover {
      background-color: #da190b;
    }

    .todo-stats {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #eee;
      font-size: 14px;
      color: #666;
      display: flex;
      justify-content: space-between;
    }

    .empty-state {
      text-align: center;
      color: #888;
      font-style: italic;
      padding: 20px;
    }
  `;

  @state()
  private _todos: TodoItem[] = [
    { id: 1, text: 'Learn Lit web components', completed: false },
    { id: 2, text: 'Build awesome apps', completed: false }
  ];

  @state()
  private _inputValue = '';

  @state()
  private _nextId = 3;

  private _addTodo(): void {
    if (this._inputValue.trim()) {
      this._todos = [
        ...this._todos,
        {
          id: this._nextId++,
          text: this._inputValue.trim(),
          completed: false
        }
      ];
      this._inputValue = '';
    }
  }

  private _deleteTodo(id: number): void {
    this._todos = this._todos.filter(todo => todo.id !== id);
  }

  private _toggleTodo(id: number): void {
    this._todos = this._todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  private _updateInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    this._inputValue = input.value;
  }

  private _handleKeyPress(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this._addTodo();
    }
  }

  private _getStats() {
    const total = this._todos.length;
    const completed = this._todos.filter(t => t.completed).length;
    const remaining = total - completed;
    return { total, completed, remaining };
  }

  render() {
    const stats = this._getStats();

    return html`
      <h3>Todo List Component</h3>

      <div class="todo-header">
        <input
          class="todo-input"
          type="text"
          .value=${this._inputValue}
          @input=${this._updateInput}
          @keypress=${this._handleKeyPress}
          placeholder="add a new todo..."
        />
        <button 
          class="add-button"
          @click=${this._addTodo}
          ?disabled=${!this._inputValue.trim()}
        >
          Add
        </button>
      </div>

      ${this._todos.length === 0
        ? html`<div class="empty-state">No todos yet. Add one above!</div>`
        : html`
          <ul class="todo-list">
            ${repeat(this._todos, todo => todo.id, todo => html`
              <li class="todo-item">
                <input 
                  class="todo-checkbox"
                  type="checkbox"
                  .checked=${todo.completed}
                  @change=${() => this._toggleTodo(todo.id)}
                />
                <span class="todo-text ${todo.completed ? 'completed' : ''}">
                  ${todo.text}
                </span>
                <button
                  class="delete-button"
                  @click=${() => this._deleteTodo(todo.id)}
                >
                  Delete
                </button>  
              </li>
            `)}
          </ul>

          <div class="todo-stats">
            <span>Total: ${stats.total}</span>
            <span>Completed: ${stats.completed}</span>
            <span>Remaining: ${stats.remaining}</span>
          </div>
        `
      }
    `;
  }
}
