'use client';

import { StageShape as StageShapeType } from '@/lib/types';

interface StageShapeProps {
  shape: StageShapeType;
  color: string;
  isActive: boolean;
  label: string;
}

export default function StageShape({ shape, color, isActive, label }: StageShapeProps) {
  const renderShape = () => {
    const baseStyle = {
      width: '100px',
      height: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color,
      transition: 'all 0.3s ease',
      border: isActive ? '4px solid #1e3a5f' : '2px solid transparent',
      boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.2)' : '0 2px 6px rgba(0,0,0,0.1)',
    };

    switch (shape) {
      case 'square':
        return (
          <div style={{ ...baseStyle, borderRadius: '8px' }}>
            <span className="text-white font-bold text-sm text-center px-2">
              {label}
            </span>
          </div>
        );
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '50px solid transparent',
              borderRight: '50px solid transparent',
              borderBottom: `100px solid ${color}`,
              position: 'relative',
              filter: isActive ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.1))',
            }}
          >
            {isActive && (
              <div
                style={{
                  position: 'absolute',
                  top: '50px',
                  left: '-48px',
                  width: '96px',
                  height: '4px',
                  backgroundColor: '#1e3a5f',
                }}
              />
            )}
            <span
              className="text-white font-bold text-sm text-center"
              style={{
                position: 'absolute',
                top: '60px',
                left: '-50px',
                width: '100px',
                display: 'block',
              }}
            >
              {label}
            </span>
          </div>
        );
      case 'circle':
        return (
          <div style={{ ...baseStyle, borderRadius: '50%' }}>
            <span className="text-white font-bold text-sm text-center px-2">
              {label}
            </span>
          </div>
        );
    }
  };

  return <div className="flex items-center justify-center">{renderShape()}</div>;
}
