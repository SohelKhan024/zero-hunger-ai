
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { 
  MapPin, AlertTriangle, Users, Filter, 
  RefreshCw, Layers
} from 'lucide-react';
import L from 'leaflet';
import { Card, Button, Badge } from '../components/ui';
import { Sidebar } from '../components/layout';
import StatsCounter from '../components/ui/StatsCounter';
import { useTheme } from '../context/ThemeContext';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const HungerMap = () => {
  const { darkMode } = useTheme();
  const [center] = useState([19.0760, 72.8777]); // Mumbai coordinates
  const [hotspots, setHotspots] = useState([]);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [kValue, setKValue] = useState(5);

  // Theme-aware color constants - SPEC COMPLIANT
  const pageBg = darkMode ? 'bg-dark' : 'bg-light-bg-secondary';
  const cardBg = darkMode ? 'bg-dark-50/50 border-dark-100' : 'bg-white border-gray-100';
  const headingColor = darkMode ? 'text-white' : 'text-slate-900';
  const subheadingColor = darkMode ? 'text-gray-400' : 'text-slate-500';
  const statValueColor = darkMode ? 'text-white' : 'text-slate-900';
  const statLabelColor = darkMode ? 'text-gray-400' : 'text-slate-500';
  const borderColor = darkMode ? 'border-dark-100' : 'border-gray-200';
  const listItemBg = darkMode ? 'bg-dark-100/50' : 'bg-gray-50';
  const listItemHover = darkMode ? 'hover:bg-dark-100' : 'hover:bg-gray-100';

  // Generate simulated hotspot data
  const generateHotspots = () => {
    setLoading(true);
    setTimeout(() => {
      const newHotspots = [];
      const baseLocations = [
        { name: 'Dharavi', lat: 19.0422, lng: 72.8544, requests: 245 },
        { name: 'Kolkata', lat: 22.5726, lng: 88.3639, requests: 189 },
        { name: 'Delhi', lat: 28.7041, lng: 77.1025, requests: 312 },
        { name: 'Chennai', lat: 13.0827, lng: 80.2706, requests: 156 },
        { name: 'Bangalore', lat: 12.9716, lng: 77.5946, requests: 234 },
        { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, requests: 178 },
        { name: 'Hyderabad', lat: 17.3854, lng: 78.4867, requests: 145 },
        { name: 'Pune', lat: 18.5204, lng: 73.8567, requests: 167 },
      ];
      
      for (let i = 0; i < kValue; i++) {
        if (baseLocations[i]) {
          newHotspots.push({
            id: i + 1,
            ...baseLocations[i],
            severity: baseLocations[i].requests > 200 ? 'high' : 
                     baseLocations[i].requests > 150 ? 'medium' : 'low',
            centroid: [baseLocations[i].lat, baseLocations[i].lng]
          });
        }
      }
      setHotspots(newHotspots);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    generateHotspots();
  }, [kValue]);

  const centerIndia = [20.5937, 78.9629];

return (
    <div className={`flex min-h-screen ${pageBg}`}>
      <Sidebar role="admin" />
      
      <main className="flex-1 ml-80 p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold mb-2 ${headingColor}`}>
            Hunger Hotspot Detection
          </h1>
          <p className={subheadingColor}>
            Identify hunger hotspots using K-Means Clustering algorithm
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
<Card className={cardBg}>
              <h3 className={`text-lg font-semibold mb-6 ${headingColor}`}>Cluster Settings</h3>
              
              <div className="space-y-4">
                <label className={`block text-sm ${statLabelColor}`}>Number of Clusters (K)</label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={kValue}
                  onChange={(e) => setKValue(parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className={`flex justify-between text-sm ${statLabelColor}`}>
                  <span>2</span>
                  <span className={`font-bold ${statValueColor}`}>{kValue}</span>
                  <span>8</span>
                </div>

                <Button 
                  className="w-full mt-6"
                  onClick={generateHotspots}
                  loading={loading}
                  icon={RefreshCw}
                >
                  Run Clustering
                </Button>
              </div>

              {/* Stats */}
              <div className={`mt-6 pt-6 border-t ${borderColor}`}>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className={statLabelColor}>Total Hotspots</span>
                    <StatsCounter end={hotspots.length} className={statValueColor} />
                  </div>
                  <div className="flex justify-between">
                    <span className={statLabelColor}>High Priority</span>
                    <Badge variant="danger">
                      {hotspots.filter(h => h.severity === 'high').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className={statLabelColor}>Total Requests</span>
                    <StatsCounter end={hotspots.reduce((sum, h) => sum + h.requests, 0)} className={statValueColor} />
                  </div>
                </div>
              </div>
            </Card>

            {/* Hotspot List */}
            <Card className={`${cardBg} mt-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${headingColor}`}>Hotspot List</h3>
              <div className="space-y-3">
                {hotspots.map((hotspot) => (
<button
                    key={hotspot.id}
                    onClick={() => setSelectedHotspot(hotspot)}
                    className={`w-full p-3 rounded-xl text-left transition-colors ${
                      selectedHotspot?.id === hotspot.id 
                        ? darkMode ? 'bg-primary/20 border border-primary/50' : 'bg-green-50 border border-green-300'
                        : `${listItemBg} ${listItemHover}`
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${headingColor}`}>{hotspot.name}</span>
                      <Badge 
                        variant={
                          hotspot.severity === 'high' ? 'danger' :
                          hotspot.severity === 'medium' ? 'warning' : 'success'
                        }
                        size="sm"
                      >
                        {hotspot.severity}
                      </Badge>
                    </div>
                    <p className={`text-sm mt-1 ${statLabelColor}`}>
                      {hotspot.requests} requests
                    </p>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Map Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
<Card className={`${cardBg} p-0 overflow-hidden`}>
              <div className={`p-4 border-b ${borderColor} flex items-center justify-between`}>
                <h3 className={`text-lg font-semibold ${headingColor}`}>Interactive Map</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="danger">
                    <MapPin className="w-3 h-3 mr-1" />
                    High Priority
                  </Badge>
                  <Badge variant="warning">
                    <MapPin className="w-3 h-3 mr-1" />
                    Medium
                  </Badge>
                  <Badge variant="success">
                    <MapPin className="w-3 h-3 mr-1" />
                    Low
                  </Badge>
                </div>
              </div>
              
              <div className="h-[600px]">
                <MapContainer 
                  center={centerIndia} 
                  zoom={5} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />
                  {hotspots.map((hotspot) => (
                    <Marker
                      key={hotspot.id}
                      position={hotspot.centroid}
                      eventHandlers={{
                        click: () => setSelectedHotspot(hotspot),
                      }}
                    >
                      <Popup>
                        <div className="text-gray-800">
                          <h3 className="font-bold">{hotspot.name}</h3>
                          <p>Requests: {hotspot.requests}</p>
                          <p>Severity: {hotspot.severity}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default HungerMap;
