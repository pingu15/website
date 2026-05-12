import "server-only";
import path from "node:path";
import exifr from "exifr";

function formatExposure(t?: number): string | null {
  if (!t || !isFinite(t)) return null;
  if (t >= 1) return `${t.toFixed(0)}s`;
  return `1/${Math.round(1 / t)}s`;
}

function formatFocal(f?: number): string | null {
  if (!f || !isFinite(f)) return null;
  return `${Math.round(f)}mm`;
}

function formatAperture(f?: number): string | null {
  if (!f || !isFinite(f)) return null;
  return `f/${f % 1 === 0 ? f.toFixed(0) : f.toFixed(1)}`;
}

function formatIso(iso?: number): string | null {
  if (!iso || !isFinite(iso)) return null;
  return `ISO ${iso}`;
}

function cleanModel(make?: string, model?: string): string | null {
  if (!model) return null;
  if (make && model.toLowerCase().startsWith(make.toLowerCase())) return model;
  return [make, model].filter(Boolean).join(" ");
}

export type CameraSpecs = { model: string | null; details: string | null };

export async function readCameraSpecs(publicPath: string): Promise<CameraSpecs | null> {
  try {
    const abs = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
    const exif = await exifr.parse(abs, {
      pick: ["Make", "Model", "FocalLength", "FNumber", "ExposureTime", "ISO"],
    });
    if (!exif) return null;
    const model = cleanModel(exif.Make, exif.Model);
    const details = [
      formatFocal(exif.FocalLength),
      formatAperture(exif.FNumber),
      formatExposure(exif.ExposureTime),
      formatIso(exif.ISO),
    ].filter(Boolean).join(" · ");
    if (!model && !details) return null;
    return { model, details: details || null };
  } catch {
    return null;
  }
}
