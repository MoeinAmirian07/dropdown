'use client'
import useDropdown from '@/app/hooks/useDropdown';

const initialItems = ['education', 'science', 'space', 'health', 'art']

const MultiDropdown: React.FC = () => {
  const {
    isOpen,
    inputRef,
    inputValue,
    items,
    setInputValue,
    keyDownHandler,
    toggleDropdown,
    deleteItem,
    selectItem,
    clearSelection
  } = useDropdown(initialItems);

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={keyDownHandler}
        onClick={clearSelection}
        placeholder="Type here"
      />
      {isOpen && (
        <div className="dropdown-content">
          {items.map((item, index) => (
            <div key={index} className="dropdown-item" onClick={() => selectItem(item)}>
              <a>{item}</a>
              <button onClick={(event) => deleteItem(index, event)} className="delete-button"></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
