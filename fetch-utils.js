const SUPABASE_URL = 'https://yyafrnrhvbvehifltlkl.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5YWZybnJodmJ2ZWhpZmx0bGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU5NDA2NDEsImV4cCI6MTk3MTUxNjY0MX0.xMaK7QxF8ut26HwnOeZONCj9728N9XXm0bIknwpAUtg';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getPlants(filter, paging) {
    const page = paging.page;
    const pageSize = paging.pageSize;

    // Always apply this to our query
    let query = client
        .from('plants')
        .select('*', { count: 'exact' })
        .range((page - 1) * pageSize, page * pageSize - 1)
        .order('Common_Name');

    // Conditionally add filters if they exist
    if (filter.name) {
        query = query.ilike('Common_Name', `%${filter.name}%`);
    }
    if (filter.type) {
        query = query.eq('Plant_Type', filter.type);
    }

    const response = await query;

    return response;
}

export async function getPlantTypes() {
    const response = await client.from('plant_types').select('*');
    return response;
}
