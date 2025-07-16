import { useState } from "react";
import InputSection from "./components/InputSection";
import LoadingSection from "./components/LoadingSection";
import ThemeToggle from "./components/ThemeToggle";
import MetricCard from "./components/MetricCard";
import DataTable from "./components/DataTable";
import {
  RiExchangeLine,
  RiFileLine,
  RiGithubLine,
  RiSpeedLine,
  RiTimeLine,
} from "react-icons/ri";
import Particles from "./components/Particles";
import DonutCircle from "./components/DonutCircle";
import ShinyText from "./components/ShinyText";

interface AuditItem {
  resourceType: string;
  requestCount: number;
  size: number;
}

interface NetworkRequest {
  url: string;
  resourceType: string;
  transferSize: number;
}

interface PerformanceData {
  performanceScore: number;
  pageSize: string;
  loadTime: string;
  httpRequests: number;
  contentSizeByType: AuditItem[];
  requestCountByType: AuditItem[];
  contentSizeByDomain: { domain: string; size: number }[];
  requestsByDomain: { domain: string; count: number }[];
}
const API_KEY = import.meta.env.VITE_GOOGLE_PAGE_API_KEY;
export default function PerformanceDashboard() {
  const [data, setData] = useState<PerformanceData | null>(null);

  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "idle"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  async function fetchData(url: string) {
    setStatus("loading");
    setError(null);

    try {
      const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        url
      )}&key=${API_KEY}`;

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Network error");

      const json = await res.json();

      const score = json.lighthouseResult.categories.performance.score;

      const pageSize =
        json.lighthouseResult.audits["total-byte-weight"].displayValue;

      const loadTime = json.lighthouseResult.audits["interactive"].displayValue;

      const httpRequests =
        json.lighthouseResult.audits["network-requests"].details.items.length;

      const resourceSummaryItems =
        json.lighthouseResult.audits["resource-summary"].details.items;

      const contentSizeByType: AuditItem[] = resourceSummaryItems.map(
        (item: any) => ({
          resourceType: item.resourceType,
          requestCount: item.requestCount,
          size: item.transferSize,
        })
      );

      const networkRequests: NetworkRequest[] =
        json.lighthouseResult.audits["network-requests"].details.items;

      function getDomain(url: string): string {
        try {
          return new URL(url).hostname.replace("www.", "");
        } catch {
          return url;
        }
      }

      const domainSizeMap = new Map<string, number>();
      const domainCountMap = new Map<string, number>();

      networkRequests.forEach((req) => {
        const domain = getDomain(req.url);
        domainSizeMap.set(
          domain,
          (domainSizeMap.get(domain) || 0) + req.transferSize
        );
        domainCountMap.set(domain, (domainCountMap.get(domain) || 0) + 1);
      });

      const contentSizeByDomain = Array.from(
        domainSizeMap,
        ([domain, size]) => ({ domain, size })
      );
      const requestsByDomain = Array.from(
        domainCountMap,
        ([domain, count]) => ({ domain, count })
      );

      setData({
        performanceScore: score,
        pageSize,
        loadTime,
        httpRequests,
        contentSizeByType,
        requestCountByType: contentSizeByType,
        contentSizeByDomain,
        requestsByDomain,
      });
      setStatus("success");
    } catch (e: any) {
      setStatus("error");
      setError(e.message || "Unknown error");
    }
  }

  const handleUrlFetch = (url: string) => {
    if (url) {
      fetchData(url);
    }
  };

  function getPerformanceGrade(score: number) {
    if (score >= 0.9) return "A";
    if (score >= 0.8) return "B";
    if (score >= 0.7) return "C";
    if (score >= 0.6) return "D";
    if (score >= 0.5) return "E";
    return "F";
  }

  function formatBytes(bytes: number) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  const tableColumns = [
    {
      key: "resourceType",
      header: "Content Type",
      align: "left" as const,
      render: (value: string) => value.toUpperCase(),
    },
    {
      key: "size",
      header: "Size",
      align: "right" as const,
      render: (value: number) => formatBytes(value),
    },
    {
      key: "requestCount",
      header: "Request Count",
      align: "right" as const,
    },
    {
      key: "percentage",
      header: "Percentage",
      align: "right" as const,
      render: (value: number, row: any) => {
        console.log("Value:", value);
        const totalSize =
          data?.contentSizeByType.reduce(
            (sum: number, item: any) => sum + item.size,
            0
          ) || 1; // Avoid division by zero

        const percent = Math.round((row.size / totalSize) * 100);
        const percentString = `${percent}`;

        const getBarColor = (resourceType: string): string => {
          switch (resourceType) {
            case "image":
              return "bg-blue-500";
            case "script":
              return "bg-green-500";
            case "stylesheet":
              return "bg-purple-500";
            case "document":
              return "bg-orange-500";
            default:
              return "bg-gray-500";
          }
        };

        return (
          <div className="flex items-center justify-end space-x-3">
            <div className="w-32 h-3 bg-base-300 rounded-full overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${getBarColor(
                  row.resourceType
                )}`}
                style={{ width: `${percent}%` }}
              ></div>
            </div>
            <span className="text-sm text-base-content/70 font-semibold min-w-[3rem]">
              {percentString}%
            </span>
          </div>
        );
      },
    },
  ];

  const tableData = data?.contentSizeByType || [];

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300">
      <nav className="w-full flex items-center justify-between !px-6 !py-4 shadow-md bg-base-200 border-b border-base-300  sticky top-0 z-10">
        {/* <h1 className="text-2xl font-bold tracking-tight text-base-content">
          Website Performance Analyzer
        </h1> */}
        <ShinyText
          text="Website Performance Analyzer"
          speed={6}
          disabled={false}
          className="text-2xl font-bold tracking-tight text-base-content"
        />
        <div className="flex items-center gap-4">
          <a
            href="https://www.github.com/dixxanta08"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="btn btn-sm btn-outline !px-2"
          >
            <RiGithubLine className="text-lg" />
          </a>
          <span className="text-sm text-base-content/70">
            Developed by Dixxanta
          </span>
        </div>
        <ThemeToggle />
      </nav>

      <main className="relative w-full flex flex-col items-center justify-center gap-8 px-6 py-16 min-h-screen bg-base-100 transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={300}
            particleSpread={10}
            speed={0.3}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>
        <section className="w-full max-w-xl flex flex-col items-center gap-6 z-10">
          {status !== "loading" && (
            <InputSection handleUrlFetch={handleUrlFetch} />
          )}
          {status === "loading" && <LoadingSection />}
        </section>
        {data && (
          <>
            <section className="w-full flex justify-center px-4 z-10">
              <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 ">
                <MetricCard
                  icon={
                    <RiSpeedLine className="text-green-600 text-4xl bg-green-100 rounded-lg p-2" />
                  }
                  value={
                    <DonutCircle
                      grade={getPerformanceGrade(data.performanceScore)}
                    />
                  }
                  title="Performance Grade"
                  description="Overall performance score"
                />

                <MetricCard
                  icon={
                    <RiFileLine className="text-blue-600 text-4xl bg-blue-100 rounded-lg p-2" />
                  }
                  value={
                    <p className="text-lg font-bold text-base-content">
                      {data.pageSize}
                    </p>
                  }
                  title="Page Size"
                  description="Total downloaded content"
                />

                <MetricCard
                  icon={
                    <RiTimeLine className="text-amber-600 text-4xl bg-amber-100 rounded-lg p-2" />
                  }
                  value={
                    <p className="text-lg font-bold text-base-content">
                      {data.loadTime}
                    </p>
                  }
                  title="Load Time"
                  description="Time to fully load"
                />

                <MetricCard
                  icon={
                    <RiExchangeLine className="text-purple-600 text-4xl bg-purple-100 rounded-lg p-2" />
                  }
                  value={
                    <p className="text-lg font-bold text-base-content">
                      {data.httpRequests}
                    </p>
                  }
                  title="HTTP Requests"
                  description="Total network requests "
                />
              </div>
            </section>

            {/* Data Table */}
            <section className="w-full max-w-6xl mx-auto px-4 z-10">
              <DataTable
                columns={tableColumns}
                data={tableData}
                title="Content Size by Type"
              />
            </section>
          </>
        )}
        {status === "error" && (
          <div className="z-10 w-full max-w-2xl mx-auto text-error text-center p-6 bg-base-200 rounded-xl shadow-lg border border-error/20">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}
      </main>
    </div>
  );
}
