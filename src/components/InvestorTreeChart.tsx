import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface Investor {
  id: number;
  name: string;
  investment: number;
  recruits: number[];
  totalEarned: number;
  netProfit: number;
  joinedRound: number;
  level: number;
}

interface TreeNode {
  investor: Investor;
  children: TreeNode[];
  x: number;
  y: number;
  depth: number;
}

interface InvestorTreeChartProps {
  investors: Investor[];
  isCollapsed: boolean;
}

const InvestorTreeChart = ({ investors, isCollapsed }: InvestorTreeChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Build tree structure from investors data
  const buildTree = (): TreeNode | null => {
    if (investors.length === 0) return null;

    const nodeMap = new Map<number, TreeNode>();
    
    // Create nodes for all investors
    investors.forEach(investor => {
      nodeMap.set(investor.id, {
        investor,
        children: [],
        x: 0,
        y: 0,
        depth: 0
      });
    });

    // Build parent-child relationships
    investors.forEach(investor => {
      const node = nodeMap.get(investor.id)!;
      investor.recruits.forEach(recruitId => {
        const childNode = nodeMap.get(recruitId);
        if (childNode) {
          node.children.push(childNode);
        }
      });
    });

    // Start with founder (first investor)
    const root = nodeMap.get(1);
    if (!root) return null;

    // Calculate positions
    positionNodes(root, 0, 0, 0);
    
    return root;
  };

  // Position nodes in tree layout
  const positionNodes = (node: TreeNode, x: number, y: number, depth: number) => {
    node.x = x;
    node.y = y;
    node.depth = depth;

    const spacing = Math.max(80, 120 - depth * 10); // Adaptive spacing
    const totalWidth = (node.children.length - 1) * spacing;
    const startX = x - totalWidth / 2;

    node.children.forEach((child, index) => {
      const childX = startX + index * spacing;
      const childY = y + 100; // Vertical spacing between levels
      positionNodes(child, childX, childY, depth + 1);
    });
  };

  // Handle zoom
  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.max(0.1, Math.min(3, newZoom));
    });
  };

  // Reset view and auto-fit
  const resetView = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  // Auto-fit to screen
  const autoFit = () => {
    if (!containerRef.current || !allNodes.length) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const contentWidth = viewBoxWidth;
    const contentHeight = viewBoxHeight;
    
    const scaleX = (containerWidth * 0.9) / contentWidth;
    const scaleY = (containerHeight * 0.9) / contentHeight;
    const newZoom = Math.min(scaleX, scaleY, 1);
    
    setZoom(newZoom);
    setPanX((containerWidth - contentWidth * newZoom) / 2);
    setPanY((containerHeight - contentHeight * newZoom) / 2);
  };

  // Mouse handlers for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - panX,
      y: e.clientY - panY
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanX(e.clientX - dragStart.x);
    setPanY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Auto-recruit logic for visualization
  useEffect(() => {
    if (investors.length > 1) {
      const updatedInvestors = [...investors];
      
      // Simple recruitment logic: each investor recruits the next few investors
      for (let i = 0; i < updatedInvestors.length; i++) {
        const investor = updatedInvestors[i];
        const maxRecruits = Math.min(3, Math.max(1, 6 - investor.level)); // Fewer recruits at deeper levels
        
        // Find potential recruits (investors who joined later and aren't already recruited)
        const potentialRecruits = updatedInvestors
          .filter(inv => 
            inv.joinedRound > investor.joinedRound && 
            !investor.recruits.includes(inv.id) &&
            inv.level <= investor.level + 1
          )
          .slice(0, maxRecruits);

        potentialRecruits.forEach(recruit => {
          if (!investor.recruits.includes(recruit.id)) {
            investor.recruits.push(recruit.id);
          }
        });
      }
    }
  }, [investors.length]);

  const tree = buildTree();
  
  if (!tree) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Investor Tree
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No investors to display
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render a node
  const renderNode = (node: TreeNode): JSX.Element => {
    const { investor } = node;
    const isProfitable = investor.netProfit > 0;
    const isFounder = investor.id === 1;
    
    return (
      <g key={investor.id}>
        {/* Node circle */}
        <circle
          cx={node.x}
          cy={node.y}
          r={isFounder ? 25 : 20}
          fill={
            isFounder 
              ? '#8b5cf6' 
              : isProfitable 
                ? '#22c55e' 
                : isCollapsed 
                  ? '#ef4444' 
                  : '#f59e0b'
          }
          stroke={selectedInvestor?.id === investor.id ? '#ffffff' : 'none'}
          strokeWidth={selectedInvestor?.id === investor.id ? 3 : 0}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setSelectedInvestor(investor)}
        />
        
        {/* Node label */}
        <text
          x={node.x}
          y={node.y + 4}
          textAnchor="middle"
          className="text-xs font-bold fill-white pointer-events-none"
        >
          {investor.id}
        </text>
        
        {/* Profit/Loss indicator */}
        <text
          x={node.x}
          y={node.y + 35}
          textAnchor="middle"
          className="text-xs fill-current"
          fill={isProfitable ? '#22c55e' : '#ef4444'}
        >
          ₹{Math.abs(investor.netProfit)}
        </text>

        {/* Children connections */}
        {node.children.map(child => (
          <line
            key={`${investor.id}-${child.investor.id}`}
            x1={node.x}
            y1={node.y + (isFounder ? 25 : 20)}
            x2={child.x}
            y2={child.y - 20}
            stroke="#64748b"
            strokeWidth={2}
            className="opacity-60"
          />
        ))}
        
        {/* Render children */}
        {node.children.map(child => renderNode(child))}
      </g>
    );
  };

  // Calculate SVG dimensions
  const getAllNodes = (node: TreeNode): TreeNode[] => {
    return [node, ...node.children.flatMap(child => getAllNodes(child))];
  };

  const allNodes = getAllNodes(tree);
  const minX = Math.min(...allNodes.map(n => n.x)) - 50;
  const maxX = Math.max(...allNodes.map(n => n.x)) + 50;
  const minY = Math.min(...allNodes.map(n => n.y)) - 50;
  const maxY = Math.max(...allNodes.map(n => n.y)) + 50;

  const viewBoxWidth = maxX - minX;
  const viewBoxHeight = maxY - minY;

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Investor Recruitment Tree
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleZoom('in')}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleZoom('out')}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={resetView}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={autoFit}>
              Fit
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex h-[500px]">
          {/* Tree visualization */}
          <div 
            ref={containerRef}
            className="flex-1 overflow-hidden bg-slate-50 dark:bg-slate-900 relative cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <svg
              ref={svgRef}
              className="w-full h-full"
              style={{
                transform: `translate(${panX}px, ${panY}px) scale(${zoom})`
              }}
            >
              <g transform={`translate(${-minX}, ${-minY})`}>
                {renderNode(tree)}
              </g>
            </svg>
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur p-3 rounded-lg border space-y-2">
              <div className="text-sm font-semibold">Legend</div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 rounded-full bg-violet-500"></div>
                <span>Founder</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Profitable</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                <span>Waiting</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>Lost Money</span>
              </div>
            </div>

            {/* Zoom indicator */}
            <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-2 py-1 rounded text-xs">
              Zoom: {(zoom * 100).toFixed(0)}%
            </div>
          </div>

          {/* Investor details panel */}
          {selectedInvestor && (
            <div className="w-80 bg-background border-l p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Investor Details</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedInvestor(null)}
                >
                  ×
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="font-medium">{selectedInvestor.name}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Investment</div>
                  <div className="font-medium">₹{selectedInvestor.investment.toLocaleString()}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Total Earned</div>
                  <div className="font-medium">₹{selectedInvestor.totalEarned.toLocaleString()}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Net Profit/Loss</div>
                  <div className={`font-medium flex items-center gap-1 ${
                    selectedInvestor.netProfit > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedInvestor.netProfit > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {selectedInvestor.netProfit > 0 ? '+' : '-'}₹{Math.abs(selectedInvestor.netProfit).toLocaleString()}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">ROI (Return on Investment)</div>
                  <div className={`font-medium ${
                    selectedInvestor.netProfit > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {((selectedInvestor.netProfit / selectedInvestor.investment) * 100).toFixed(1)}%
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <Badge variant={selectedInvestor.netProfit > 0 ? "default" : "destructive"}>
                    {selectedInvestor.netProfit > 0 ? "Profitable" : "Loss"}
                  </Badge>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Joined Round</div>
                  <Badge variant="outline">{selectedInvestor.joinedRound}</Badge>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Level</div>
                  <Badge variant="secondary">{selectedInvestor.level}</Badge>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Recruits</div>
                  <div className="font-medium">{selectedInvestor.recruits.length} people</div>
                  {selectedInvestor.recruits.length > 0 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      IDs: {selectedInvestor.recruits.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestorTreeChart;