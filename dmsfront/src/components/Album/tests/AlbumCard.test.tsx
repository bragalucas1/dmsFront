// import AlbumCard from '../AlbumCard';
// import { render } from '@testing-library/react'; // Import `act` de `react`
// import React, {act} from 'react';

// describe('AlbumCard', () => {
//   const mockAlbum = {
//     id: 1,
//     userId: 1,
//     title: 'Vacation Photos'
//   };

//   it('renders album title', () => {
//     const { getByText } = render(
//       <AlbumCard 
//         album={mockAlbum} 
//         onSelect={() => {}} 
//       />
//     );

//     expect(getByText('Vacation Photos')).toBeInTheDocument();
//   });

//   it('shows edit/delete buttons when canEdit is true', () => {
//     const { getByText } = render(
//       <AlbumCard 
//         album={mockAlbum} 
//         onSelect={() => {}} 
//         canEdit={true}
//       />
//     );

//     expect(getByText('Edit')).toBeInTheDocument();
//     expect(getByText('Delete')).toBeInTheDocument();
//   });
// });
export {}