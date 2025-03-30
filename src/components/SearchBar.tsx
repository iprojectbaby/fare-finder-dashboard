
import React, { useState } from 'react';
import { MapPin, Calendar, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { popularDestinations } from '@/data/fakeData';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
}

export interface SearchParams {
  from: string;
  to: string;
  date: Date | undefined;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const handleSearch = () => {
    onSearch({ from, to, date });
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="search-container p-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-primary">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="From"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              onFocus={() => setShowFromSuggestions(true)}
              onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
            />
          </div>
          {showFromSuggestions && (
            <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 py-1 max-h-60 overflow-auto">
              {popularDestinations
                .filter((city) => 
                  city.name.toLowerCase().includes(from.toLowerCase()) || 
                  city.code.toLowerCase().includes(from.toLowerCase())
                )
                .map((city) => (
                  <div
                    key={city.code}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setFrom(city.name);
                      setShowFromSuggestions(false);
                    }}
                  >
                    <div className="font-medium">{city.name}</div>
                    <div className="text-sm text-gray-500">{city.code}</div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-primary">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="To"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onFocus={() => setShowToSuggestions(true)}
              onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
            />
          </div>
          {showToSuggestions && (
            <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 py-1 max-h-60 overflow-auto">
              {popularDestinations
                .filter((city) => 
                  city.name.toLowerCase().includes(to.toLowerCase()) || 
                  city.code.toLowerCase().includes(to.toLowerCase())
                )
                .map((city) => (
                  <div
                    key={city.code}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setTo(city.name);
                      setShowToSuggestions(false);
                    }}
                  >
                    <div className="font-medium">{city.name}</div>
                    <div className="text-sm text-gray-500">{city.code}</div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <Popover open={dateOpen} onOpenChange={setDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {formatDate(date)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate);
                setDateOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button 
          onClick={handleSearch} 
          className="bg-primary hover:bg-primary/90 text-white py-2"
        >
          <Search className="mr-2 h-4 w-4" />
          Search Fares
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
