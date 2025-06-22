/**
 * This file provides a simple chart component for stock price visualization
 */
import React, { useEffect, useRef } from 'react';
import { PricePoint } from '../../types';

/**
 * Props for the StockChart component
 */
interface StockChartProps {
  data: PricePoint[];
  width?: number;
  height?: number;
  lineColor?: string;
  fillColor?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
}

/**
 * Component for rendering stock price charts
 */
export const StockChart: React.FC<StockChartProps> = ({
  data,
  width = 500,
  height = 300,
  lineColor = '#4f46e5',
  fillColor = 'rgba(79, 70, 229, 0.1)',
  showGrid = true,
  showTooltip = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Find min and max values
    const prices = data.map(point => point.price);
    const minPrice = Math.min(...prices) * 0.98;
    const maxPrice = Math.max(...prices) * 1.02;
    const priceRange = maxPrice - minPrice;

    // Draw grid if enabled
    if (showGrid) {
      drawGrid(ctx, width, height, minPrice, maxPrice);
    }

    // Draw chart
    ctx.beginPath();
    ctx.moveTo(0, height - ((data[0].price - minPrice) / priceRange) * height);

    // Draw line
    data.forEach((point, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((point.price - minPrice) / priceRange) * height;
      ctx.lineTo(x, y);
    });

    // Style and draw the line
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Fill area under the line
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();

    // Setup tooltip events if enabled
    if (showTooltip && tooltipRef.current) {
      setupTooltip(canvas, tooltipRef.current, data, width, height, minPrice, priceRange);
    }
  }, [data, width, height, lineColor, fillColor, showGrid, showTooltip]);

  /**
   * Draws grid lines on the chart
   */
  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    minPrice: number,
    maxPrice: number
  ) => {
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;

    // Horizontal grid lines (5 lines)
    for (let i = 0; i <= 5; i++) {
      const y = (i / 5) * height;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }

    // Vertical grid lines (10 lines)
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * width;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    ctx.stroke();
  };

  /**
   * Sets up tooltip interaction for the chart
   */
  const setupTooltip = (
    canvas: HTMLCanvasElement,
    tooltip: HTMLDivElement,
    data: PricePoint[],
    width: number,
    height: number,
    minPrice: number,
    priceRange: number
  ) => {
    let timeoutId: number;

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const dataIndex = Math.round((x / width) * (data.length - 1));
      
      if (dataIndex >= 0 && dataIndex < data.length) {
        const point = data[dataIndex];
        const pointX = (dataIndex / (data.length - 1)) * width;
        const pointY = height - ((point.price - minPrice) / priceRange) * height;
        
        tooltip.style.display = 'block';
        tooltip.style.left = `${pointX + 10}px`;
        tooltip.style.top = `${pointY - 40}px`;
        tooltip.innerHTML = `
          <div class="date">${point.date}</div>
          <div class="price">$${point.price.toFixed(2)}</div>
        `;
        
        clearTimeout(timeoutId);
      }
    });

    canvas.addEventListener('mouseleave', () => {
      timeoutId = window.setTimeout(() => {
        tooltip.style.display = 'none';
      }, 300);
    });
  };

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      {showTooltip && (
        <div
          ref={tooltipRef}
          className="absolute hidden bg-white dark:bg-gray-800 p-2 rounded-md shadow-md text-sm pointer-events-none"
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
};
