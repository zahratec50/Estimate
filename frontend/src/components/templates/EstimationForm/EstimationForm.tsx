// 'use client';

// import { useAppStore } from '@/store/useAppStore';

// export default function EstimationForm() {
//   const { projects, currentProjectId, updateProject } = useAppStore();
//   const currentProject = projects.find((p) => p.id === currentProjectId);
//   const estimationForm = currentProject?.estimationForm || {
//     roomType: '',
//     dimensions: { width: 0, height: 0, length: 0 },
//     materials: [],
//     location: '',
//   };

//   const handleRoomTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     if (currentProjectId) {
//       updateProject(currentProjectId, {
//         estimationForm: { ...estimationForm, roomType: e.target.value },
//       });
//     }
//   };

//   const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (currentProjectId) {
//       const { name, value } = e.target;
//       updateProject(currentProjectId, {
//         estimationForm: {
//           ...estimationForm,
//           dimensions: { ...estimationForm.dimensions, [name]: Number(value) },
//         },
//       });
//     }
//   };

//   const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (currentProjectId) {
//       updateProject(currentProjectId, {
//         estimationForm: { ...estimationForm, location: e.target.value },
//       });
//     }
//   };

//   return (
//     <div className="p-4 mt-8">
//       <h2 className="text-lg font-semibold mb-4">Project Details</h2>
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Location</label>
//           <input
//             type="text"
//             value={estimationForm.location}
//             onChange={handleLocationChange}
//             placeholder="Enter project location (e.g., New York)"
//             className="mt-1 block w-full border rounded-md p-2"
//             aria-label="Project Location"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Room Type</label>
//           <select
//             value={estimationForm.roomType}
//             onChange={handleRoomTypeChange}
//             className="mt-1 block w-full border rounded-md p-2"
//             aria-label="Select Room Type"
//           >
//             <option value="">Select Room</option>
//             <option value="kitchen">Kitchen</option>
//             <option value="bathroom">Bathroom</option>
//             <option value="living-room">Living Room</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Dimensions (meters)</label>
//           <div className="flex space-x-2">
//             <input
//               type="number"
//               name="width"
//               value={estimationForm.dimensions.width}
//               onChange={handleDimensionChange}
//               placeholder="Width"
//               className="mt-1 block w-full border rounded-md p-2"
//               aria-label="Room Width"
//             />
//             <input
//               type="number"
//               name="height"
//               value={estimationForm.dimensions.height}
//               onChange={handleDimensionChange}
//               placeholder="Height"
//               className="mt-1 block w-full border rounded-md p-2"
//               aria-label="Room Height"
//             />
//             <input
//               type="number"
//               name="length"
//               value={estimationForm.dimensions.length}
//               onChange={handleDimensionChange}
//               placeholder="Length"
//               className="mt-1 block w-full border rounded-md p-2"
//               aria-label="Room Length"
//             />
//           </div>
//         </div>
//         <div>
//           <p className="text-sm font-medium">
//             Estimated Cost: $0.00 (Add materials for accurate estimate)
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }