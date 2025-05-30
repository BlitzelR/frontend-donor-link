import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { WalletButton } from "./wallet/WalletButton";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`mb-4 w-full py-4 bg-background/50 backdrop-blur-sm z-[100] relative ${isSticky ? 'sticky top-0' : ''}`}>
      <div className="relative">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-lg font-bold">Donor Link</Link>
          <div className="hidden md:flex gap-4 items-center font-bold text-secondary-element">
            <Link to="/leaderboard" activeProps={{className: "text-key-element"}} activeOptions={{exact: true}}>Leaderboard</Link>
            <Link to="/fundraisers" activeProps={{className: "text-key-element"}} activeOptions={{exact: true}}>For Donors</Link>
            <Link to="/fundraisers/create" activeProps={{className: "text-key-element"}}>Create Fundraiser</Link>
            <WalletButton />
          </div>
          
          <button 
            className="md:hidden py-1 text-secondary-element active:bg-emphasized-element active:text-key-element active:rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`md:hidden absolute left-0 right-0 top-[calc(100%+1rem)] bg-background/95 backdrop-blur-sm rounded-md shadow-lg transform transition-all duration-200 z-[100] ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}>
          <nav className="flex flex-col p-4 gap-4 items-start font-bold text-secondary-element">
            <Link
              to="/leaderboard"
              activeProps={{className: "text-key-element"}}
              activeOptions={{exact: true}}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link 
              to="/fundraisers" 
              activeProps={{className: "text-key-element"}}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              For Donors
            </Link>
            <Link 
              to="/fundraisers/create" 
              activeProps={{className: "text-key-element"}}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create Fundraiser
            </Link>
            <div className="w-full">
              <WalletButton />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}