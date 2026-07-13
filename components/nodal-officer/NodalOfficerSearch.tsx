"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { searchNodalOfficers, type NodalOfficer } from "@/lib/nodalOfficerData";
import SearchSection from "./SearchSection";
import EmptyStateAndPoints from "./EmptyStateAndPoints";

export default function NodalOfficerSearch() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");

  const trimmed = query.trim();
  const results = useMemo(() => searchNodalOfficers(trimmed), [trimmed]);
  const hasResults = results.length > 0;

  return (
    <>
      <SearchSection query={query} onQueryChange={setQuery} />

      {hasResults && <ResultsTable results={results} />}

      <EmptyStateAndPoints
        showEmptyState={!hasResults}
        emptyMessage={trimmed ? `${t("nodalNoMatch")} “${trimmed}”` : undefined}
      />
    </>
  );
}

function ResultsTable({ results }: { results: NodalOfficer[] }) {
  const { t } = useLanguage();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p className="text-sm text-gray-600">
        {results.length} {results.length === 1 ? t("nodalResultsCountOne") : t("nodalResultsCount")}
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
              <th scope="col" className="py-3 pr-4 font-semibold">{t("nodalColInstitution")}</th>
              <th scope="col" className="py-3 pr-4 font-semibold">{t("nodalColCity")}</th>
              <th scope="col" className="py-3 pr-4 font-semibold">{t("nodalColEmail")}</th>
              <th scope="col" className="py-3 font-semibold">{t("nodalColPhone")}</th>
            </tr>
          </thead>
          <tbody>
            {results.map((officer) => (
              <tr key={officer.institution} className="border-b border-gray-100 align-top">
                <td className="py-4 pr-4 font-semibold text-gray-900">{officer.institution}</td>
                <td className="py-4 pr-4 text-gray-700">{officer.city}</td>
                <td className="py-4 pr-4">
                  <a href={`mailto:${officer.email}`} className="text-[#0f6cbd] hover:underline">
                    {officer.email}
                  </a>
                </td>
                <td className="py-4 whitespace-nowrap text-gray-700">{officer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* The dataset is a stand-in (see lib/nodalOfficerData.ts). Saying so beats letting a reader
          dial a placeholder number believing it is their bank's grievance line. */}
      <p className="mt-4 rounded border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
        {t("nodalSampleNote")}
      </p>
    </section>
  );
}
