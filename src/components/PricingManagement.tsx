import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save, 
  X, 
  ArrowUp, 
  ArrowDown,
  Check,
  MapPin,
  Navigation,
  Search,
  Map,
  TrendingDown,
  Zap,
  AlertCircle
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Switch } from './ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { useLanguage } from './LanguageContext';
import { apiServiceManager } from '../services/apiService';
import type { APIServicePricing } from '../types/pricing';
import { toast } from 'sonner';

// Icon mapping
const ICON_MAP: { [key: string]: any } = {
  MapPin,
  Navigation,
  Search,
  Map,
  Zap,
  DollarSign,
};

const AVAILABLE_ICONS = [
  { value: 'MapPin', label: 'Map Pin' },
  { value: 'Navigation', label: 'Navigation' },
  { value: 'Search', label: 'Search' },
  { value: 'Map', label: 'Map' },
  { value: 'Zap', label: 'Zap' },
  { value: 'DollarSign', label: 'Dollar Sign' },
];

const CATEGORIES = [
  { value: 'geocoding', label: 'Geocoding' },
  { value: 'routing', label: 'Routing' },
  { value: 'places', label: 'Places' },
  { value: 'maps', label: 'Maps' },
  { value: 'other', label: 'Other' },
];

const COLOR_OPTIONS = [
  { value: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Blue' },
  { value: 'text-green-500', bg: 'bg-green-500/10', label: 'Green' },
  { value: 'text-purple-500', bg: 'bg-purple-500/10', label: 'Purple' },
  { value: 'text-orange-500', bg: 'bg-orange-500/10', label: 'Orange' },
  { value: 'text-red-500', bg: 'bg-red-500/10', label: 'Red' },
  { value: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'Yellow' },
  { value: 'text-pink-500', bg: 'bg-pink-500/10', label: 'Pink' },
  { value: 'text-indigo-500', bg: 'bg-indigo-500/10', label: 'Indigo' },
];

export function PricingManagement() {
  const { t, language } = useLanguage();
  const fontClass = language === 'km' ? 'font-kh' : 'font-en';

  const [services, setServices] = useState<APIServicePricing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<APIServicePricing | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<APIServicePricing | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    serviceKey: '',
    icon: 'MapPin',
    pricePerThousand: '',
    googlePrice: '',
    category: 'geocoding' as 'geocoding' | 'routing' | 'places' | 'maps' | 'other',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const data = await apiServiceManager.getAPIServicePricing();
      setServices(data);
    } catch (error) {
      console.error('Failed to load services:', error);
      toast.error('Failed to load pricing services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (service?: APIServicePricing) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        description: service.description,
        serviceKey: service.serviceKey,
        icon: service.icon,
        pricePerThousand: service.pricePerThousand.toString(),
        googlePrice: service.googlePrice.toString(),
        category: service.category,
        color: service.color,
        bgColor: service.bgColor,
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        description: '',
        serviceKey: '',
        icon: 'MapPin',
        pricePerThousand: '',
        googlePrice: '',
        category: 'geocoding',
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingService(null);
  };

  const handleSave = async () => {
    try {
      if (!formData.name || !formData.pricePerThousand || !formData.googlePrice) {
        toast.error('Please fill in all required fields');
        return;
      }

      const pricePerThousand = parseFloat(formData.pricePerThousand);
      const googlePrice = parseFloat(formData.googlePrice);

      if (isNaN(pricePerThousand) || isNaN(googlePrice)) {
        toast.error('Please enter valid prices');
        return;
      }

      if (editingService) {
        // Update existing service
        await apiServiceManager.updateAPIServicePricing({
          id: editingService.id,
          name: formData.name,
          description: formData.description,
          pricePerThousand,
          googlePrice,
        });
        toast.success('Service updated successfully');
      } else {
        // Create new service
        const maxOrder = services.length > 0 
          ? Math.max(...services.map(s => s.order)) 
          : 0;
        
        await apiServiceManager.createAPIServicePricing({
          serviceKey: formData.serviceKey || formData.name.toLowerCase().replace(/\s+/g, '_'),
          name: formData.name,
          description: formData.description,
          icon: formData.icon,
          pricePerThousand,
          googlePrice,
          category: formData.category,
          color: formData.color,
          bgColor: formData.bgColor,
          order: maxOrder + 1,
        });
        toast.success('Service created successfully');
      }

      await loadServices();
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to save service:', error);
      toast.error('Failed to save service');
    }
  };

  const handleToggleStatus = async (service: APIServicePricing) => {
    try {
      await apiServiceManager.toggleAPIServicePricingStatus(service.id);
      toast.success(`Service ${service.isActive ? 'disabled' : 'enabled'}`);
      await loadServices();
    } catch (error) {
      console.error('Failed to toggle service status:', error);
      toast.error('Failed to update service status');
    }
  };

  const handleDelete = async () => {
    if (!serviceToDelete) return;

    try {
      await apiServiceManager.deleteAPIServicePricing(serviceToDelete.id);
      toast.success('Service deleted successfully');
      await loadServices();
      setIsDeleteDialogOpen(false);
      setServiceToDelete(null);
    } catch (error) {
      console.error('Failed to delete service:', error);
      toast.error('Failed to delete service');
    }
  };

  const handleMoveUp = async (service: APIServicePricing) => {
    if (service.order === 1) return;
    
    try {
      await apiServiceManager.reorderAPIServicePricing(service.id, service.order - 1);
      await loadServices();
      toast.success('Service moved up');
    } catch (error) {
      console.error('Failed to reorder service:', error);
      toast.error('Failed to reorder service');
    }
  };

  const handleMoveDown = async (service: APIServicePricing) => {
    const maxOrder = Math.max(...services.map(s => s.order));
    if (service.order === maxOrder) return;
    
    try {
      await apiServiceManager.reorderAPIServicePricing(service.id, service.order + 1);
      await loadServices();
      toast.success('Service moved down');
    } catch (error) {
      console.error('Failed to reorder service:', error);
      toast.error('Failed to reorder service');
    }
  };

  const calculateSavings = (roktenhPrice: number, googlePrice: number) => {
    if (googlePrice === 0) return 0;
    return Math.round(((googlePrice - roktenhPrice) / googlePrice) * 100);
  };

  return (
    <div className="mx-auto space-y-6 max-w-[1920px] w-full">
      {/* Header */}
      <div>
        <div>
          <h1 className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}>
            {t.pricing?.apiServicePricing || 'API Service Pricing Management'}
          </h1>
          <p className={`text-zinc-600 dark:text-zinc-400 mt-2 ${fontClass}`}>
            {t.pricing?.managePricingDesc || 'Manage pricing for API services displayed on the landing page and pricing calculator'}
          </p>
        </div>
      </div>

      {/* Info Alert */}
      <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50">
        <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className={`text-blue-700 dark:text-blue-300 ${fontClass}`}>
          {t.pricing?.pricingInfo || 'These pricing configurations will be displayed on the landing page and used in the pricing calculator. Active services will be visible to users.'}
        </AlertDescription>
      </Alert>

      {/* Services List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B5BA5]" />
        </div>
      ) : services.length === 0 ? (
        <Card className="p-12 text-center bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <DollarSign className="w-12 h-12 mx-auto mb-4 text-zinc-400" />
          <h3 className={`text-zinc-900 dark:text-zinc-100 mb-2 ${fontClass}`}>
            {t.common?.noData || 'No services yet'}
          </h3>
          <p className={`text-zinc-600 dark:text-zinc-400 ${fontClass}`}>
            {t.pricing?.addFirstService || 'Contact administrator to add services'}
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {services.map((service) => {
            const IconComponent = ICON_MAP[service.icon] || MapPin;
            const savings = calculateSavings(service.pricePerThousand, service.googlePrice);

            return (
              <Card
                key={service.id}
                className="p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Service Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-lg ${service.bgColor}`}>
                      <IconComponent className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-zinc-900 dark:text-zinc-100 font-en`}>
                          {service.name}
                        </h3>
                        <Badge
                          variant={service.isActive ? 'default' : 'secondary'}
                          className="font-en"
                        >
                          {service.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge variant="outline" className="font-en">
                          {service.category}
                        </Badge>
                        {savings > 0 && (
                          <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 font-en">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            {savings}% vs Google
                          </Badge>
                        )}
                      </div>
                      <p className={`text-sm text-zinc-600 dark:text-zinc-400 mb-3 font-en`}>
                        {service.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <span className="text-zinc-500 dark:text-zinc-500 font-en">
                            RokTenh Price:
                          </span>{' '}
                          <span className="text-zinc-900 dark:text-zinc-100 font-en">
                            ${service.pricePerThousand.toFixed(2)}/1K
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 dark:text-zinc-500 font-en">
                            Google Price:
                          </span>{' '}
                          <span className="text-zinc-900 dark:text-zinc-100 font-en">
                            ${service.googlePrice.toFixed(2)}/1K
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 dark:text-zinc-500 font-en">
                            Per Request:
                          </span>{' '}
                          <span className="text-zinc-900 dark:text-zinc-100 font-en">
                            ${service.pricePerRequest.toFixed(4)}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 dark:text-zinc-500 font-en">
                            Order:
                          </span>{' '}
                          <span className="text-zinc-900 dark:text-zinc-100 font-en">
                            #{service.order}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveUp(service)}
                      disabled={service.order === 1}
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 p-0"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveDown(service)}
                      disabled={service.order === Math.max(...services.map(s => s.order))}
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 p-0"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Switch
                      checked={service.isActive}
                      onCheckedChange={() => handleToggleStatus(service)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDialog(service)}
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 p-0"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setServiceToDelete(service);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <DialogHeader>
            <DialogTitle className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}>
              {editingService
                ? t.common?.edit || 'Edit Service'
                : t.common?.addNew || 'Add New Service'}
            </DialogTitle>
            <DialogDescription className={`text-zinc-600 dark:text-zinc-400 ${fontClass}`}>
              {editingService
                ? t.pricing?.editServiceDesc || 'Update the pricing information for this service'
                : t.pricing?.addServiceDesc || 'Add a new API service with pricing information'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Service Name */}
            <div className="grid gap-2">
              <Label htmlFor="name" className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}>
                {t.common?.name || 'Service Name'} *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Geocoding API"
                className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 font-en"
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description" className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}>
                {t.common?.description || 'Description'}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the service"
                className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 font-en"
                rows={3}
              />
            </div>

            {!editingService && (
              <>
                {/* Service Key */}
                <div className="grid gap-2">
                  <Label htmlFor="serviceKey" className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}>
                    Service Key
                  </Label>
                  <Input
                    id="serviceKey"
                    value={formData.serviceKey}
                    onChange={(e) => setFormData({ ...formData, serviceKey: e.target.value })}
                    placeholder="e.g., geocoding (auto-generated if empty)"
                    className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 font-en"
                  />
                </div>

                {/* Icon and Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="icon" className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}>
                      Icon
                    </Label>
                    <Select
                      value={formData.icon}
                      onValueChange={(value) => setFormData({ ...formData, icon: value })}
                    >
                      <SelectTrigger className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 font-en">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_ICONS.map((icon) => (
                          <SelectItem key={icon.value} value={icon.value} className="font-en">
                            {icon.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="category" className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}>
                      Category
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: any) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 font-en">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value} className="font-en">
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Color */}
                <div className="grid gap-2">
                  <Label htmlFor="color" className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}>
                    Color Theme
                  </Label>
                  <Select
                    value={formData.color}
                    onValueChange={(value) => {
                      const colorOption = COLOR_OPTIONS.find(c => c.value === value);
                      setFormData({
                        ...formData,
                        color: value,
                        bgColor: colorOption?.bg || 'bg-blue-500/10',
                      });
                    }}
                  >
                    <SelectTrigger className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 font-en">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COLOR_OPTIONS.map((color) => (
                        <SelectItem key={color.value} value={color.value} className="font-en">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded ${color.bg} border border-zinc-200 dark:border-zinc-700`} />
                            {color.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="pricePerThousand" className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}>
                  RokTenh Price (per 1K) *
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-en">
                    $
                  </span>
                  <Input
                    id="pricePerThousand"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.pricePerThousand}
                    onChange={(e) => setFormData({ ...formData, pricePerThousand: e.target.value })}
                    placeholder="2.50"
                    className="pl-7 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 font-en"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="googlePrice" className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}>
                  Google Price (per 1K) *
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-en">
                    $
                  </span>
                  <Input
                    id="googlePrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.googlePrice}
                    onChange={(e) => setFormData({ ...formData, googlePrice: e.target.value })}
                    placeholder="5.00"
                    className="pl-7 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 font-en"
                  />
                </div>
              </div>
            </div>

            {/* Savings Preview */}
            {formData.pricePerThousand && formData.googlePrice && (
              <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-700 dark:text-green-300 font-en">
                  Savings: {calculateSavings(parseFloat(formData.pricePerThousand), parseFloat(formData.googlePrice))}% 
                  compared to Google Maps Platform
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCloseDialog}
              className={fontClass}
            >
              <X className="w-4 h-4 mr-2" />
              {t.common?.cancel || 'Cancel'}
            </Button>
            <Button
              onClick={handleSave}
              className={`bg-[#1B5BA5] hover:bg-[#164a8a] text-white ${fontClass}`}
            >
              <Save className="w-4 h-4 mr-2" />
              {t.common?.save || 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <DialogHeader>
            <DialogTitle className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}>
              {t.common?.confirmDelete || 'Confirm Delete'}
            </DialogTitle>
            <DialogDescription className={`text-zinc-600 dark:text-zinc-400 ${fontClass}`}>
              {t.pricing?.deleteServiceWarning || 'Are you sure you want to delete this service? This action cannot be undone.'}
            </DialogDescription>
          </DialogHeader>
          {serviceToDelete && (
            <div className="py-4">
              <p className={`text-zinc-900 dark:text-zinc-100 font-en`}>
                {serviceToDelete.name}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setServiceToDelete(null);
              }}
              className={fontClass}
            >
              {t.common?.cancel || 'Cancel'}
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              className={fontClass}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t.common?.delete || 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}