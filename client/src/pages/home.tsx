import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">X4 Foundations Tools</h1>
        <p className="text-muted-foreground">
          Manage your space empire with our suite of tools and calculators
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Ships Database</CardTitle>
          </CardHeader>
          <CardContent>
            <AspectRatio ratio={16/9}>
              <img 
                src="https://images.unsplash.com/photo-1614314007212-0257d6e2f7d8"
                alt="Space Station"
                className="rounded-md object-cover"
              />
            </AspectRatio>
            <p className="mt-4 text-sm text-muted-foreground">
              Browse and compare ship specifications, loadouts, and prices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Station Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <AspectRatio ratio={16/9}>
              <img 
                src="https://images.unsplash.com/photo-1633984726552-3ed7296dc5c9"
                alt="Space Station Construction"
                className="rounded-md object-cover"
              />
            </AspectRatio>
            <p className="mt-4 text-sm text-muted-foreground">
              Plan your station builds with our resource calculator
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trade Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <AspectRatio ratio={16/9}>
              <img 
                src="https://images.unsplash.com/photo-1720962158849-2c3b22499d2b"
                alt="Trade Interface"
                className="rounded-md object-cover"
              />
            </AspectRatio>
            <p className="mt-4 text-sm text-muted-foreground">
              Visualize and optimize your trading operations
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
