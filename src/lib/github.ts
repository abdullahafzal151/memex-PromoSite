// Fetches the latest Memex release from the public memex-releases repo.
// Falls back gracefully to a static releases-page link if the API call
// fails or is rate-limited — the download section never depends on this
// succeeding to remain usable.

const OWNER = "abdullahafzal151";
const REPO = "memex-releases";

export const RELEASES_PAGE_URL = `https://github.com/${OWNER}/${REPO}/releases`;
export const LATEST_RELEASE_PAGE_URL = `https://github.com/${OWNER}/${REPO}/releases/latest`;
export const REPO_URL = `https://github.com/${OWNER}/${REPO}`;

export interface ReleaseInfo {
  version: string;
  msiUrl: string;
  msiSizeMb: string | null;
  publishedAt: string | null;
}

export async function fetchLatestRelease(): Promise<ReleaseInfo | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) return null;
    const data = await res.json();

    const msiAsset = (data.assets ?? []).find((a: any) =>
      a.name?.toLowerCase().endsWith(".msi")
    );
    if (!msiAsset) return null;

    return {
      version: (data.tag_name ?? "").replace(/^v/, ""),
      msiUrl: msiAsset.browser_download_url,
      msiSizeMb: msiAsset.size
        ? (msiAsset.size / (1024 * 1024)).toFixed(1)
        : null,
      publishedAt: data.published_at ?? null,
    };
  } catch {
    return null;
  }
}
