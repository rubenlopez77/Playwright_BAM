import { UiElementDefinition } from './ux.types';

type TodoUxMap = {
    INPUT_BOX: UiElementDefinition;
    TODO_ITEMS: UiElementDefinition;
    TODO_COUNT: UiElementDefinition;
    CLEAR_COMPLETED: UiElementDefinition;
    TOGGLE: UiElementDefinition;
    DESTROY: UiElementDefinition;
    LABEL: UiElementDefinition;
};

export const TodoLocators: TodoUxMap = {
    INPUT_BOX: {
        selector: '.new-todo',
        name: 'New todo input',
        role: 'textbox',
    },
    TODO_ITEMS: {
        selector: '.todo-list li',
        name: 'Todo items',
        role: 'listitem',
    },
    TODO_COUNT: {
        selector: '.todo-count',
        name: 'Active todo count',
    },
    CLEAR_COMPLETED: {
        selector: 'text=Clear completed',
        name: 'Clear completed button',
        role: 'button',
    },
    TOGGLE: {
        selector: '.toggle',
        name: 'Todo toggle checkbox',
        role: 'checkbox',
    },
    DESTROY: {
        selector: '.destroy',
        name: 'Delete todo button',
        role: 'button',
    },
    LABEL: {
        selector: 'label',
        name: 'Todo label',
    },
};
