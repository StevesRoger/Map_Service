import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  DollarSign, 
  TrendingDown,
  CheckCircle2,
  XCircle,
  Infinity,
  Gift,
  AlertCircle
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { apiServiceManager } from '../services/apiService';
import type { PlanApiCost, PlanApiCostCreateRequest } from '../types/planApiCosts';
import type { PricingTier, APIServicePricing } from '../types/pricing';

export function PlanCostsManagement() {
  const [planCosts, setPlanCosts] = useState<PlanApiCost[]>([]);
  const [plans, setPlans] = useState<PricingTier[]>([]);
  const [services, setServices] = useState<APIServicePricing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('basic');

  // Form state
  const [formData, setFormData] = useState<Partial<PlanApiCost>>({
    pricePerThousand: 0,
    includedRequests: 0,
    monthlyLimit: null,
    discountPercent: 0,
  });

  // New cost creation state
  const [newCostData, setNewCostData] = useState<PlanApiCostCreateRequest>({
    planId: 'basic',
    serviceKey: '',
    pricePerThousand: 0,
    includedRequests: 0,
    monthlyLimit: null,
    discountPercent: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [costsData, plansData, servicesData] = await Promise.all([
        apiServiceManager.getPlanApiCosts(),
        apiServiceManager.getPricingTiers(),
        apiServiceManager.getAPIServicePricing(),
      ]);
      setPlanCosts(costsData);
      setPlans(plansData);
      setServices(servicesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (cost: PlanApiCost) => {
    setEditingId(cost.id);
    setFormData({
      pricePerThousand: cost.pricePerThousand,
      includedRequests: cost.includedRequests,
      monthlyLimit: cost.monthlyLimit,
      discountPercent: cost.discountPercent,
    });
  };

  const handleSave = async () => {
    if (!editingId) return;

    try {
      await apiServiceManager.updatePlanApiCost({
        id: editingId,
        ...formData,
      });
      await loadData();
      setEditingId(null);
      setFormData({});
    } catch (error) {
      console.error('Failed to update cost:', error);
      alert('Failed to update cost configuration');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this cost configuration?')) return;

    try {
      await apiServiceManager.deletePlanApiCost(id);
      await loadData();
    } catch (error) {
      console.error('Failed to delete cost:', error);
      alert('Failed to delete cost configuration');
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await apiServiceManager.togglePlanApiCostStatus(id);
      await loadData();
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const handleCreate = async () => {
    if (!newCostData.serviceKey) {
      alert('Please select a service');
      return;
    }

    try {
      await apiServiceManager.createPlanApiCost({
        ...newCostData,
        planId: selectedPlan,
      });
      await loadData();
      setIsCreating(false);
      setNewCostData({
        planId: selectedPlan,
        serviceKey: '',
        pricePerThousand: 0,
        includedRequests: 0,
        monthlyLimit: null,
        discountPercent: 0,
      });
    } catch (error) {
      console.error('Failed to create cost:', error);
      alert('Failed to create cost configuration');
    }
  };

  const getCostsForPlan = (planId: string) => {
    return planCosts.filter(cost => cost.planId === planId);
  };

  const getAvailableServicesForPlan = (planId: string) => {
    const existingServiceKeys = getCostsForPlan(planId).map(c => c.serviceKey);
    return services.filter(s => !existingServiceKeys.includes(s.serviceKey) && s.isActive);
  };

  const renderCostCard = (cost: PlanApiCost) => {
    const isEditing = editingId === cost.id;
    const service = services.find(s => s.serviceKey === cost.serviceKey);

    return (
      <Card 
        key={cost.id} 
        className={`p-4 ${!cost.isActive ? 'opacity-50 border-zinc-700' : 'border-zinc-700'} bg-zinc-900/50`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-en">{cost.serviceName}</h3>
              {!cost.isActive && (
                <Badge variant="outline" className="text-xs border-zinc-600 text-zinc-400">
                  Inactive
                </Badge>
              )}
              {cost.discountPercent > 0 && (
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  {cost.discountPercent}% OFF
                </Badge>
              )}
            </div>
            <p className="text-sm text-zinc-400 font-en">
              Service Key: {cost.serviceKey}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleToggleStatus(cost.id)}
              className="h-8 w-8 p-0"
            >
              {cost.isActive ? (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-zinc-500" />
              )}
            </Button>
            {isEditing ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  className="h-8 w-8 p-0"
                >
                  <Save className="w-4 h-4 text-green-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({});
                  }}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(cost)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="w-4 h-4 text-blue-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(cost.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Price Per Thousand */}
          <div>
            <Label className="text-xs text-zinc-400 mb-1">Price per 1K Requests</Label>
            {isEditing ? (
              <div className="flex items-center gap-1">
                <span className="text-zinc-400">$</span>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.pricePerThousand || 0}
                  onChange={(e) => setFormData({ ...formData, pricePerThousand: parseFloat(e.target.value) || 0 })}
                  className="bg-zinc-800 border-zinc-700 h-8 font-en"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-zinc-500" />
                <span className="font-en">{cost.pricePerThousand.toFixed(2)}</span>
                <span className="text-xs text-zinc-500 font-en">
                  (${cost.pricePerRequest.toFixed(5)}/req)
                </span>
              </div>
            )}
          </div>

          {/* Discount Percent */}
          <div>
            <Label className="text-xs text-zinc-400 mb-1">Discount</Label>
            {isEditing ? (
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  value={formData.discountPercent || 0}
                  onChange={(e) => setFormData({ ...formData, discountPercent: parseInt(e.target.value) || 0 })}
                  className="bg-zinc-800 border-zinc-700 h-8 font-en"
                />
                <span className="text-zinc-400">%</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-green-400" />
                <span className="font-en">{cost.discountPercent}%</span>
              </div>
            )}
          </div>

          {/* Included Requests */}
          <div>
            <Label className="text-xs text-zinc-400 mb-1">Included Requests</Label>
            {isEditing ? (
              <Input
                type="number"
                step="1000"
                min="0"
                value={formData.includedRequests || 0}
                onChange={(e) => setFormData({ ...formData, includedRequests: parseInt(e.target.value) || 0 })}
                className="bg-zinc-800 border-zinc-700 h-8 font-en"
              />
            ) : (
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-purple-400" />
                <span className="font-en">
                  {cost.includedRequests > 0 ? cost.includedRequests.toLocaleString() : 'None'}
                </span>
              </div>
            )}
          </div>

          {/* Monthly Limit */}
          <div>
            <Label className="text-xs text-zinc-400 mb-1">Monthly Limit</Label>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  step="1000"
                  min="0"
                  value={formData.monthlyLimit === null ? '' : formData.monthlyLimit}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    monthlyLimit: e.target.value === '' ? null : parseInt(e.target.value) || 0 
                  })}
                  placeholder="Unlimited"
                  className="bg-zinc-800 border-zinc-700 h-8 font-en"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Infinity className="w-4 h-4 text-cyan-400" />
                <span className="font-en">
                  {cost.monthlyLimit !== null ? cost.monthlyLimit.toLocaleString() : 'Unlimited'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <span className="font-en">ID: {cost.id}</span>
          <span className="font-en">Updated: {new Date(cost.updatedAt).toLocaleDateString()}</span>
        </div>
      </Card>
    );
  };

  const renderCreateForm = () => {
    const availableServices = getAvailableServicesForPlan(selectedPlan);

    if (availableServices.length === 0) {
      return (
        <Card className="p-6 border-zinc-700 bg-zinc-900/50">
          <div className="text-center text-zinc-400">
            <AlertCircle className="w-12 h-12 mx-auto mb-2 text-zinc-600" />
            <p>All available services have been added to this plan.</p>
          </div>
        </Card>
      );
    }

    return (
      <Card className="p-6 border-zinc-700 bg-zinc-900/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-en">Add Service to Plan</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCreating(false)}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Service Selection */}
          <div className="col-span-2">
            <Label className="text-sm text-zinc-300 mb-2">Service</Label>
            <select
              value={newCostData.serviceKey}
              onChange={(e) => {
                const service = services.find(s => s.serviceKey === e.target.value);
                setNewCostData({ 
                  ...newCostData, 
                  serviceKey: e.target.value,
                  // Pre-fill with service's default pricing
                  pricePerThousand: service?.pricePerThousand || 0,
                });
              }}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100 font-en"
            >
              <option value="">Select a service...</option>
              {availableServices.map(service => (
                <option key={service.serviceKey} value={service.serviceKey}>
                  {service.name} - ${service.pricePerThousand}/1K (default)
                </option>
              ))}
            </select>
          </div>

          {/* Price Per Thousand */}
          <div>
            <Label className="text-sm text-zinc-300 mb-2">Price per 1K Requests ($)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={newCostData.pricePerThousand}
              onChange={(e) => setNewCostData({ ...newCostData, pricePerThousand: parseFloat(e.target.value) || 0 })}
              className="bg-zinc-800 border-zinc-700 font-en"
            />
          </div>

          {/* Discount Percent */}
          <div>
            <Label className="text-sm text-zinc-300 mb-2">Discount (%)</Label>
            <Input
              type="number"
              step="1"
              min="0"
              max="100"
              value={newCostData.discountPercent}
              onChange={(e) => setNewCostData({ ...newCostData, discountPercent: parseInt(e.target.value) || 0 })}
              className="bg-zinc-800 border-zinc-700 font-en"
            />
          </div>

          {/* Included Requests */}
          <div>
            <Label className="text-sm text-zinc-300 mb-2">Included Requests</Label>
            <Input
              type="number"
              step="1000"
              min="0"
              value={newCostData.includedRequests}
              onChange={(e) => setNewCostData({ ...newCostData, includedRequests: parseInt(e.target.value) || 0 })}
              placeholder="0 = Pay as you go"
              className="bg-zinc-800 border-zinc-700 font-en"
            />
          </div>

          {/* Monthly Limit */}
          <div>
            <Label className="text-sm text-zinc-300 mb-2">Monthly Limit</Label>
            <Input
              type="number"
              step="1000"
              min="0"
              value={newCostData.monthlyLimit === null ? '' : newCostData.monthlyLimit}
              onChange={(e) => setNewCostData({ 
                ...newCostData, 
                monthlyLimit: e.target.value === '' ? null : parseInt(e.target.value) || 0 
              })}
              placeholder="Leave empty for unlimited"
              className="bg-zinc-800 border-zinc-700 font-en"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setIsCreating(false)}
            className="border-zinc-700 hover:bg-zinc-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!newCostData.serviceKey}
            className="bg-[#1b5ba5] hover:bg-[#1b5ba5]/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>
      </Card>
    );
  };

  const renderPlanTab = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    const costs = getCostsForPlan(planId);
    const activeCosts = costs.filter(c => c.isActive);
    const totalIncluded = activeCosts.reduce((sum, c) => sum + c.includedRequests, 0);
    const avgDiscount = activeCosts.length > 0 
      ? activeCosts.reduce((sum, c) => sum + c.discountPercent, 0) / activeCosts.length 
      : 0;

    return (
      <div className="space-y-6">
        {/* Plan Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 border-zinc-700 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Total Services</span>
              <DollarSign className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-2xl font-en">{costs.length}</div>
            <div className="text-xs text-zinc-500 font-en">{activeCosts.length} active</div>
          </Card>

          <Card className="p-4 border-zinc-700 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Included Requests</span>
              <Gift className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-2xl font-en">{totalIncluded.toLocaleString()}</div>
            <div className="text-xs text-zinc-500">Free monthly requests</div>
          </Card>

          <Card className="p-4 border-zinc-700 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Avg Discount</span>
              <TrendingDown className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-en">{avgDiscount.toFixed(1)}%</div>
            <div className="text-xs text-zinc-500">Compared to standard</div>
          </Card>

          <Card className="p-4 border-zinc-700 bg-gradient-to-br from-orange-500/10 to-red-500/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Rate Limit</span>
              <Infinity className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-2xl font-en">{plan?.rateLimit || 0}</div>
            <div className="text-xs text-zinc-500">req/second</div>
          </Card>
        </div>

        {/* Add Service Button */}
        {!isCreating && (
          <Button
            onClick={() => {
              setIsCreating(true);
              setSelectedPlan(planId);
              setNewCostData({
                planId,
                serviceKey: '',
                pricePerThousand: 0,
                includedRequests: 0,
                monthlyLimit: null,
                discountPercent: 0,
              });
            }}
            className="w-full bg-[#1b5ba5] hover:bg-[#1b5ba5]/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service to {plan?.displayName}
          </Button>
        )}

        {/* Create Form */}
        {isCreating && selectedPlan === planId && renderCreateForm()}

        {/* Cost Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {costs.length === 0 ? (
            <Card className="col-span-2 p-12 border-zinc-700 bg-zinc-900/50">
              <div className="text-center text-zinc-400">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-zinc-600" />
                <h3 className="text-lg mb-2">No services configured</h3>
                <p className="text-sm mb-4">Add services to this plan to get started.</p>
                <Button
                  onClick={() => {
                    setIsCreating(true);
                    setSelectedPlan(planId);
                  }}
                  className="bg-[#1b5ba5] hover:bg-[#1b5ba5]/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Service
                </Button>
              </div>
            </Card>
          ) : (
            costs.map(cost => renderCostCard(cost))
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-zinc-400">Loading plan cost configurations...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl mb-2 font-en">Plan API Costs Management</h2>
        <p className="text-zinc-400">
          Configure pricing, limits, and discounts for each API service across different pricing plans.
        </p>
      </div>

      {/* Tabs for each plan */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-900 border border-zinc-700">
          <TabsTrigger value="basic" className="font-en">
            Starter Plan
          </TabsTrigger>
          <TabsTrigger value="pro" className="font-en">
            Professional Plan
          </TabsTrigger>
          <TabsTrigger value="enterprise" className="font-en">
            Enterprise Plan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6">
          {renderPlanTab('basic')}
        </TabsContent>

        <TabsContent value="pro" className="mt-6">
          {renderPlanTab('pro')}
        </TabsContent>

        <TabsContent value="enterprise" className="mt-6">
          {renderPlanTab('enterprise')}
        </TabsContent>
      </Tabs>
    </div>
  );
}
