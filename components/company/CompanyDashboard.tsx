"use client";

import { useMemo, useState } from "react";

import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import { CompanyInsight } from "@/types/companyInsight";
import CompanyAnalytics from "./CompanyAnalytics";
import CompanyCard from "./CompanyCard";
import CompanyBarChart from "./CompanyBarChart";
import CompanyLeaderboard from "./CompanyLeaderboard";
import { Application } from "@/types/application";

interface Props {
  applications: Application[];
  recruiters: Recruiter[];
  communications: RecruiterCommunication[];
}

export default function CompanyDashboard({
  applications,
  recruiters,
  communications,
}: Props) {
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState<
    "alphabetical" | "recruiters" | "communications" | "responses"
  >("communications");

  console.log("recruiters in company Dashboard is:", recruiters);

  const companies = useMemo(() => {
    const applicationMap = new Map(
      applications.map((application) => [
        application._id.toString(),
        application,
      ]),
    );

    const recruiterMap = new Map(
      recruiters.map((recruiter) => [recruiter._id.toString(), recruiter]),
    );

    const map = new Map<string, CompanyInsight>();

    
    applications.forEach((application) => {
      const companyName = application.company.trim();

      if (!map.has(companyName)) {
        map.set(companyName, {
          company: companyName,
          recruiterCount: 0,
          communicationCount: 0,
          responseCount: 0,
          responseRate: 0,
          lastContact: undefined,
          recruiters: [],
        });
      }
    });

    recruiters.forEach((recruiter) => {
      const application = applicationMap.get(recruiter.applicationId.toString());

      if (!application) return;

      const company = application.company.trim();
      const item = map.get(company);

      if (!item) return;

      item.recruiterCount++;

      item.recruiters.push(recruiter._id);

      if (
        recruiter.lastContact &&
        (!item.lastContact ||
          new Date(recruiter.lastContact) > new Date(item.lastContact))
      ) {
        item.lastContact = recruiter.lastContact;
      }
    });

    communications.forEach((communication) => {
      const recruiter = recruiterMap.get(communication.recruiterId.toString());

      if (!recruiter) {
        return;
      }

      const application = applicationMap.get(recruiter.applicationId.toString());

      if (!application) return;

      const item = map.get(application.company.trim());

      if (!item) return;

      item.communicationCount++;

      if (communication.responded) {
        item.responseCount++;
      }
    });

    map.forEach((company) => {
      company.responseRate =
        company.communicationCount === 0
          ? 0
          : Math.round(
              (company.responseCount / company.communicationCount) * 100,
            );
    });

    let result = [...map.values()];

    result = result.filter((company) =>
      company.company.toLowerCase().includes(search.toLowerCase()),
    );

    const sortedCompanies = [...result];

    switch (sortBy) {
      case "alphabetical":
        sortedCompanies.sort((a, b) => a.company.localeCompare(b.company));
        break;

      case "recruiters":
        sortedCompanies.sort((a, b) => b.recruiterCount - a.recruiterCount);
        break;

      case "communications":
        sortedCompanies.sort((a, b) => b.communicationCount - a.communicationCount);
        break;

      case "responses":
        sortedCompanies.sort((a, b) => b.responseRate - a.responseRate);
        break;
    }

    return sortedCompanies;
  }, [applications, recruiters, communications, search, sortBy]);

  return (
    <div className="space-y-6">
      <CompanyAnalytics companies={companies} />
      <CompanyBarChart companies={companies} />
      <CompanyLeaderboard companies={companies} />
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 flex-1"
        />

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value as
                | "alphabetical"
                | "recruiters"
                | "communications"
                | "responses",
            )
          }
          className="border rounded p-2"
        >
          <option value="communications">Most Communications</option>

          <option value="responses">Highest Response Rate</option>

          <option value="recruiters">Most Recruiters</option>

          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      {companies.length === 0 ? (
        <p>No companies found.</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {companies.map((company) => (
            <CompanyCard key={company.company} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}
