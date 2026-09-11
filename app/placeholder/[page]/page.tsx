import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
export default async function Placeholder({params}:{params:Promise<{page:string}>}){const {page}=await params;return <PlaceholderPage title={page.charAt(0).toUpperCase()+page.slice(1)}/>;}
