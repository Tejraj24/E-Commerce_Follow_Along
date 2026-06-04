import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useSearchSuggestions from '../hooks/useSearchSuggestions';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * SearchBar — live search input with debounced suggestions dropdown.
 * Designed to be embedded inside the OvermodeHeader search overlay.
 *
 * Props:
 *   - onSubmit: optional callback after navigation
 *   - initialQuery: optional initial search text
 *   - placeholder: optional placeholder text
 */
const SearchBar = ({ onSubmit, initialQuery = '', placeholder = 'Search premium styles, brands, categories...' }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const { suggestions, isLoading } = useSearchSuggestions(query);

  const showDropdown = isFocused && query.trim().length >= 2 && (suggestions.length > 0 || isLoading);

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  const handleNavigate = useCallback((searchTerm) => {
    const q = searchTerm.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setIsFocused(false);
    onSubmit?.();
  }, [navigate, onSubmit]);

  const handleSuggestionClick = useCallback((suggestion) => {
    if (suggestion.type === 'product' && suggestion.id) {
      navigate(`/product/${suggestion.id}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(suggestion.text)}`);
    }
    setQuery(suggestion.text);
    setIsFocused(false);
    onSubmit?.();
  }, [navigate, onSubmit]);

  const handleKeyDown = useCallback((e) => {
    if (!showDropdown) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleNavigate(query);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleNavigate(query);
        }
        break;
      case 'Escape':
        setIsFocused(false);
        break;
      default:
        break;
    }
  }, [showDropdown, suggestions, selectedIndex, query, handleNavigate, handleSuggestionClick]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        inputRef.current && !inputRef.current.contains(e.target)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-bar-wrapper">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="search-bar-input"
        autoComplete="off"
        aria-label="Search products"
        aria-expanded={showDropdown}
        aria-autocomplete="list"
        role="combobox"
      />

      {showDropdown && (
        <div ref={dropdownRef} className="search-suggestions-dropdown" role="listbox">
          {isLoading && suggestions.length === 0 && (
            <div className="search-suggestion-loading">
              <div className="search-suggestion-spinner" />
              <span>Searching...</span>
            </div>
          )}
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${suggestion.text}-${index}`}
              className={`search-suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
              role="option"
              aria-selected={index === selectedIndex}
            >
              {suggestion.type === 'product' && suggestion.image && (
                <img
                  src={`${API_URL}${suggestion.image}`}
                  alt=""
                  className="search-suggestion-img"
                  loading="lazy"
                />
              )}
              {suggestion.type === 'category' && (
                <span className="search-suggestion-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                  </svg>
                </span>
              )}
              <div className="search-suggestion-text">
                <span className="search-suggestion-name">{suggestion.text}</span>
                {suggestion.type === 'product' && suggestion.category && (
                  <span className="search-suggestion-category">in {suggestion.category}</span>
                )}
                {suggestion.type === 'category' && (
                  <span className="search-suggestion-category">Category</span>
                )}
              </div>
              <span className="search-suggestion-arrow">→</span>
            </button>
          ))}
          {query.trim().length >= 2 && suggestions.length > 0 && (
            <button
              className="search-suggestion-viewall"
              onClick={() => handleNavigate(query)}
            >
              View all results for "<strong>{query.trim()}</strong>"
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
