'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react';


const useDropdown = (initialItems: string[] = []) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('Science');
  const [items, setItems] = useState<string[]>(initialItems);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const clickOutsideHandler = useCallback((event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', clickOutsideHandler);

    return () => {
      window.removeEventListener('click', clickOutsideHandler);
    };
  }, [clickOutsideHandler]);

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setItems([...items, inputValue.trim()]);
      setInputValue('');
    }
  };
  const deleteItem = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const updatedItems = [...items];
    const deletedItem = updatedItems.splice(index, 1)[0];
    setItems(updatedItems);
    if (inputValue === deletedItem) {
      setInputValue('');
    }
  };
  const selectItem = (item: string) => {
    setInputValue(item);
    setIsOpen(false);
  };
  const clearSelection = () => {
    setInputValue('');
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    inputRef,
    inputValue,
    items,
    setInputValue,
    keyDownHandler,
    toggleDropdown,
    deleteItem,
    selectItem,
    clearSelection,
  };
};
export default useDropdown;