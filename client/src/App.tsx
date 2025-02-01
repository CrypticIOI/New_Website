import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Ships from "@/pages/ships";
import Stations from "@/pages/stations";
import Trade from "@/pages/trade";
import { PageContainer } from "@/components/layout/page-container";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ships" component={Ships} />
      <Route path="/stations" component={Stations} />
      <Route path="/trade" component={Trade} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageContainer>
        <Router />
      </PageContainer>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
