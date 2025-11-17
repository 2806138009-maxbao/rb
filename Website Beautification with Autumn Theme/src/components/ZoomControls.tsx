import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

interface ZoomControlsProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ZoomControls({ scale, onZoomIn, onZoomOut, onReset }: ZoomControlsProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
      <div className="text-center text-sm mb-2">
        {Math.round(scale * 100)}%
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={onZoomIn}
        title="放大 (Ctrl + 滚轮向上)"
      >
        <ZoomIn className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onZoomOut}
        title="缩小 (Ctrl + 滚轮向下)"
      >
        <ZoomOut className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onReset}
        title="重置缩放"
      >
        <RotateCcw className="size-4" />
      </Button>
    </div>
  );
}
