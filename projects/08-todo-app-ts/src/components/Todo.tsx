import { type TodoId, type Todo as TodoType } from "../types";

interface Props extends TodoType {
    onToggleTodoCompleted: ({id, completed}:  Pick<TodoType, 'id' | 'completed'>) => void,
    onRemoveTodo: ({id}: TodoId) => void;
}



export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleTodoCompleted }) => {

    const handleChangeToggle = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
        onToggleTodoCompleted({
            id,
            completed: event.target.checked
        })
    };

    return (
        <div className="view">
            <input
                className="toggle"
                checked={completed}
                type="checkbox"
                onChange={handleChangeToggle}
            />
            <label>{title}</label>
            <button
                onClick={() => {
                    onRemoveTodo({id})
                }}
                className="destroy"
            />
        </div>
    );
}
