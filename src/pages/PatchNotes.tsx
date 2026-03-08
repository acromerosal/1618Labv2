import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Terminal, Code, Eye } from 'lucide-react';
import { SoundService } from '../services/soundService';
import { patchNotes } from '../data/content';
import { Link } from 'react-router-dom';
import * as ReactWindow from 'react-window';
import * as AutoSizerModule from 'react-virtualized-auto-sizer';

// @ts-ignore
const AutoSizer = AutoSizerModule.default || AutoSizerModule;
// @ts-ignore
const List = ReactWindow.FixedSizeList || ReactWindow.default.FixedSizeList;

const PatchNotes = () => {
  const [activeProject, setActiveProject] = useState<typeof patchNotes[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInteraction = () => {
    SoundService.init();
    SoundService.playClick();
  };

  // Row component for react-window
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    // We need to map the single column index to our grid layout logic if we want a grid.
    // However, react-window's FixedSizeList is for simple lists. 
    // For a responsive grid, we need to calculate how many items fit per row.
    // Let's assume a responsive grid: 1 col (mobile), 2 cols (md), 3 cols (lg).
    
    // To keep it simple with virtualization, let's render a "row" of items.
    // We need to know the width of the container to determine columns.
    // AutoSizer gives us width.
    
    // Actually, react-window has a VariableSizeGrid or FixedSizeGrid, but they require fixed column widths usually.
    // A simpler approach for "responsive grid virtualization" is to use the List component 
    // where each "row" renders multiple items (the columns).
    
    // But wait, the user asked to "render only visible elements".
    // If we use standard CSS grid, we can't easily virtualize without a library like `react-virtuoso`'s Grid 
    // or manually chunking.
    
    // Let's use `react-window` with a custom Row that renders N items.
    // We need to pass the column count to the Row.
    
    // Since we can't easily pass props to Row in FixedSizeList without a wrapper or context,
    // let's use the `itemData` prop.
    
    return null; // Placeholder, logic moved inside the main component render
  };

  return (
    <section id="patch-notes-section" className="py-32 bg-dark min-h-screen relative flex flex-col">
      <div className="max-w-7xl mx-auto px-4 md:px-12 w-full flex-shrink-0">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-8 border-b border-white/20 pb-4 text-center md:text-left gap-4 md:gap-0">
           <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white uppercase">CASE ABSTRACTS</h2>
           <span className="font-mono text-xs mb-2 text-gold uppercase">EVIDENCE_LOG</span>
        </div>
      </div>

      <div className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-12 h-[800px]">
        <AutoSizer>
          {({ height, width }) => {
            // Determine columns based on width
            const COLUMNS = width < 768 ? 1 : width < 1024 ? 2 : 3;
            const GAP = 32;
            const ROW_HEIGHT = (width / COLUMNS) * 0.75 + GAP; // Aspect ratio 4/3 + gap
            const rowCount = Math.ceil(patchNotes.length / COLUMNS);

            return (
              <List
                height={height}
                itemCount={rowCount}
                itemSize={ROW_HEIGHT}
                width={width}
                itemData={{ columns: COLUMNS, items: patchNotes, gap: GAP, width }}
              >
                {({ index, style, data }) => {
                  const { columns, items, gap, width: containerWidth } = data;
                  const startIndex = index * columns;
                  const rowItems = items.slice(startIndex, startIndex + columns);
                  
                  // Calculate item width accounting for gaps
                  // totalWidth = (itemWidth * cols) + (gap * (cols - 1))
                  // itemWidth = (totalWidth - (gap * (cols - 1))) / cols
                  const itemWidth = (containerWidth - (gap * (columns - 1))) / columns;

                  return (
                    <div style={{ ...style, display: 'flex', gap: `${gap}px` }}>
                      {rowItems.map((project: typeof patchNotes[0]) => (
                        <motion.div 
                          key={project.id} 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          viewport={{ once: true }}
                          className="group relative overflow-hidden border border-white/10 cursor-pointer flex-shrink-0"
                          style={{ width: itemWidth, height: itemWidth * 0.75 }} // 4:3 aspect ratio
                          onMouseEnter={() => {
                            SoundService.init();
                            SoundService.playGlitch();
                          }}
                          onClick={() => {
                            handleInteraction();
                            setActiveProject(project);
                          }}
                        >
                          <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" style={{ backgroundImage: `url(${project.image})` }}></div>
                          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500"></div>
                          
                          <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <span className="font-mono text-xs text-gold border border-gold px-2 py-1 bg-black/50 backdrop-blur-sm">{project.id}</span>
                              <div className="bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                                <ArrowUpRight size={20} />
                              </div>
                            </div>
                            
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <h3 className="text-xl md:text-2xl font-bold uppercase mb-1 text-white group-hover:text-gold transition-colors line-clamp-2">{project.title}</h3>
                              <p className="font-mono text-[10px] text-gray-400 tracking-widest uppercase">{project.category}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  );
                }}
              </List>
            );
          }}
        </AutoSizer>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={() => setActiveProject(null)}
            />
            <motion.div 
              layoutId={`project-${activeProject.id}`}
              className="bg-black border border-white/20 text-white w-full max-w-6xl max-h-[95vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col md:flex-row"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <button 
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white hover:text-black transition-colors border border-white/20 z-50 rounded-full"
              >
                <X size={24} />
              </button>

              {/* Left: Image & Key Info */}
              <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
                 <div className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: `url(${activeProject.image})` }}></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                 
                 <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                    <div className="font-mono text-gold text-xs tracking-widest mb-2 border border-gold inline-block px-2 py-1">
                      CASE_FILE: {activeProject.id}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold uppercase leading-none mb-4">{activeProject.title}</h2>
                    <div className="flex gap-4 font-mono text-xs text-gray-400">
                      <span>CLIENT: {activeProject.client}</span>
                      <span>//</span>
                      <span>YEAR: {activeProject.year}</span>
                    </div>
                 </div>
              </div>

              {/* Right: Details */}
              <div className="w-full md:w-1/2 p-8 md:p-12 bg-dark border-l border-white/10 flex flex-col gap-8">
                 
                 <div>
                   <h3 className="flex items-center gap-2 font-mono text-gold text-xs tracking-widest uppercase mb-4">
                     <Terminal size={14} /> Mission_Brief
                   </h3>
                   <div className="space-y-6">
                     <div>
                       <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Challenge</span>
                       <p className="text-gray-300 leading-relaxed">{activeProject.challenge}</p>
                     </div>
                     <div>
                       <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Solution</span>
                       <p className="text-white leading-relaxed">{activeProject.solution}</p>
                     </div>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                    {activeProject.impact && Object.entries(activeProject.impact).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-gray-500 text-[10px] uppercase tracking-widest block mb-1">{key.replace(/_/g, ' ')}</span>
                        <span className="text-2xl md:text-3xl font-bold text-gold">{value}</span>
                      </div>
                    ))}
                 </div>

                 <div>
                   <h3 className="flex items-center gap-2 font-mono text-gold text-xs tracking-widest uppercase mb-4">
                     <Code size={14} /> Tech_Stack
                   </h3>
                   <div className="flex flex-wrap gap-2">
                     {activeProject.stack?.map(tech => (
                       <span key={tech} className="px-3 py-1 border border-white/20 text-xs font-mono hover:bg-white hover:text-black transition-colors cursor-default">
                         {tech}
                       </span>
                     ))}
                   </div>
                 </div>

                 <div className="mt-auto pt-8">
                   <Link 
                     to="/decrypt-brief"
                     className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gold transition-colors flex items-center justify-center gap-2"
                   >
                     <Eye size={18} />
                     Solicitar Similar
                   </Link>
                 </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PatchNotes;
