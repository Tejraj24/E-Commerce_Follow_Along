import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const Breadcrumbs = ({ items }) => {
  const location = useLocation();

  // If no items provided, generate from current path
  const breadcrumbItems = items || generateBreadcrumbsFromPath(location.pathname);

  if (breadcrumbItems.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 py-4" aria-label="Breadcrumb">
      <Link 
        to="/" 
        className="flex items-center hover:text-gray-900 transition-colors"
        aria-label="Home"
      >
        <FiHome size={16} />
      </Link>
      
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        
        return (
          <React.Fragment key={index}>
            <FiChevronRight size={14} className="text-gray-400" />
            
            {isLast ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.path}
                className="hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

function generateBreadcrumbsFromPath(pathname) {
  const pathSegments = pathname.split('/').filter(segment => segment);
  const breadcrumbs = [];
  
  let currentPath = '';
  
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Convert URL segment to readable label
    let label = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Handle special cases
    switch (segment) {
      case 'men':
        label = "Men's Collection";
        break;
      case 'women':
        label = "Women's Collection";
        break;
      case 'clothing':
        label = 'Clothing';
        break;
      case 'footwear':
        label = 'Footwear';
        break;
      case 'accessories':
        label = 'Accessories';
        break;
      case 'bags':
        label = 'Bags';
        break;
      case 'brands':
        label = 'Brands';
        break;
      case 'sale':
        label = 'Sale';
        break;
      case 'about':
        label = 'About';
        break;
      case 'contact':
        label = 'Contact';
        break;
      default:
        // Keep the transformed label for other cases
        break;
    }
    
    breadcrumbs.push({
      label,
      path: currentPath
    });
  });
  
  return breadcrumbs;
}

export default Breadcrumbs;
