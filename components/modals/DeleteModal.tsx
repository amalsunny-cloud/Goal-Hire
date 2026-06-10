"use client";

interface DeleteModalProps{
    isOpen: boolean;
    title?: string;
    message?: string;
    onConfirm:()=>void;
    onCancel:()=>void;
    loading?:boolean;
}
export default function DeleteModal({
    isOpen,
    title = "Delete Item",
    message = "Are you sure you want to delete this item?",
    onConfirm,
    onCancel,
    loading= false,
}: DeleteModalProps) {
    if(!isOpen){
        return null;
    }
    
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600 my-3">{message}</p>
        <div className="flex justify-end gap-3">
            <button onClick={onCancel} disabled={loading} className="px-4 py-2 border rounded">Cancel</button>

            <button onClick={onConfirm} disabled={loading} className="bg-red-500 text-white px-4 py-2 rounded">{loading ? "Deleting..." : "Delete"}</button>
        </div>
      </div>
    </div>
  )
}
