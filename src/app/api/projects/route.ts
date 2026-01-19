export const dynamic = 'force-static'; //
import { getAllProjects } from '@/lib/projects'; // Create this helper if needed
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch everything at once so it can be saved as a static file
    const data = await getAllProjects();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
