"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface DashboardStats {
  totalActiveIssues: number;
  slaComplianceRate: number;
  averageResolutionTime: number;
  citizenSatisfaction: number;
  criticalIssuesPending: number;
  slaBreeches: number;
  resolvedIssuesThisMonth: number;
  trendPercentages: {
    activeIssues: number;
    slaCompliance: number;
    resolutionTime: number;
    satisfaction: number;
  };
}

export interface HotspotData {
  month: string;
  potholes: number;
  streetlights: number;
  water: number;
  sanitation: number;
  predicted: number;
}

export interface ResourceDemand {
  week: string;
  maintenance: number;
  emergency: number;
  planned: number;
  capacity: number;
}

export interface SLAAlert {
  id: string;
  issueId: number;
  title: string;
  category: string;
  priority: string;
  status: string;
  reportedDate: string;
  slaDeadline: string;
  timeRemaining: string;
  location: string;
  assignedTo: string;
  riskLevel: string;
  estimatedImpact: string;
}

export interface DepartmentPerformance {
  department: string;
  totalIssues: number;
  resolved: number;
  avgResolutionTime: number;
  slaCompliance: number;
  efficiency: number;
}

export interface ActivityItem {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  severity: string;
}

export interface PredictiveInsight {
  expectedIssues: {
    nextWeek: number;
    nextMonth: number;
    peakDays: string[];
    highRiskAreas: string[];
  };
  resourceNeeds: {
    additionalStaff: number;
    equipmentUpgrade: string[];
    budgetIncrease: number;
  };
  recommendations: string[];
}

export interface GeospatialData {
  area: string;
  lat: number;
  lng: number;
  issueCount: number;
  riskScore: number;
  category: string;
}

interface DashboardContextType {
  stats: DashboardStats;
  hotspotData: HotspotData[];
  resourceDemand: ResourceDemand[];
  slaAlerts: SLAAlert[];
  departmentPerformance: DepartmentPerformance[];
  recentActivity: ActivityItem[];
  predictiveInsights: PredictiveInsight | null;
  geospatialData: GeospatialData[];
  isLoading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
  refreshDashboard: () => Promise<void>;
  updateStats: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<DashboardStats>({
    totalActiveIssues: 243,
    slaComplianceRate: 82.3,
    averageResolutionTime: 3.8,
    citizenSatisfaction: 4.5,
    criticalIssuesPending: 35,
    slaBreeches: 8,
    resolvedIssuesThisMonth: 127,
    trendPercentages: {
      activeIssues: 18,
      slaCompliance: -5.1,
      resolutionTime: -1.2,
      satisfaction: 0.3,
    },
  });

  const [hotspotData, setHotspotData] = useState<HotspotData[]>([]);
  const [resourceDemand, setResourceDemand] = useState<ResourceDemand[]>([]);
  const [slaAlerts, setSlaAlerts] = useState<SLAAlert[]>([]);
  const [departmentPerformance, setDepartmentPerformance] = useState<DepartmentPerformance[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [predictiveInsights, setPredictiveInsights] = useState<PredictiveInsight | null>(null);
  const [geospatialData, setGeospatialData] = useState<GeospatialData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/dashboard");

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();

      // Update all dashboard state
      if (data.issueStatistics) {
        setStats({
          totalActiveIssues: data.issueStatistics.totalIssues || 243,
          slaComplianceRate: data.issueStatistics.slaCompliance || 82.3,
          averageResolutionTime: data.issueStatistics.averageResolutionTime || 3.8,
          citizenSatisfaction: data.issueStatistics.citizenSatisfaction || 4.5,
          criticalIssuesPending: data.issueStatistics.criticalIssues || 35,
          slaBreeches: 8,
          resolvedIssuesThisMonth: 127,
          trendPercentages: {
            activeIssues: 18,
            slaCompliance: -5.1,
            resolutionTime: -1.2,
            satisfaction: 0.3,
          },
        });
      }

      if (data.hotspotTrends) {
        setHotspotData(data.hotspotTrends);
      }

      if (data.resourceDemand) {
        setResourceDemand(data.resourceDemand);
      }

      if (data.slaAlerts) {
        setSlaAlerts(data.slaAlerts);
      }

      if (data.departmentPerformance) {
        setDepartmentPerformance(data.departmentPerformance);
      }

      if (data.recentActivity) {
        setRecentActivity(data.recentActivity);
      }

      if (data.predictiveInsights) {
        setPredictiveInsights(data.predictiveInsights);
      }

      if (data.geospatialData) {
        setGeospatialData(data.geospatialData);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update stats only
  const updateStats = useCallback(async () => {
    try {
      const response = await fetch("/api/dashboard/stats");

      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }

      const data = await response.json();

      if (data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Error updating stats:", err);
    }
  }, []);

  // Refresh dashboard
  const refreshDashboard = useCallback(async () => {
    await fetchDashboardData();
  }, [fetchDashboardData]);

  // Fetch dashboard data on mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Auto-refresh dashboard every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      updateStats();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [updateStats]);

  const value: DashboardContextType = {
    stats,
    hotspotData,
    resourceDemand,
    slaAlerts,
    departmentPerformance,
    recentActivity,
    predictiveInsights,
    geospatialData,
    isLoading,
    error,
    fetchDashboardData,
    refreshDashboard,
    updateStats,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

// Custom hook to use dashboard context
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
