import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import VenezuelaMap from '../components/VenezuelaMap';
import Papa from 'papaparse';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/SOS_Ven_Den_Campanas_2025.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
          complete: (results) => {
            const formattedProjects = results.data
              .filter(row => row.Title)
              .map(row => {
                let coords = [-66, 7];
                if (row.coordinates) {
                  try {
                    coords = JSON.parse(row.coordinates.trim());
                  } catch (e) {
                    console.error('Error parsing coordinates for:', row.Title, e);
                  }
                }

                return {
                  title: row.Title || 'Untitled Project',
                  description: row['Project Description'] || '',
                  date: row.Date || '',
                  location: row.Location || '',
                  coordinates: coords,
                  link: row.Link || '',
                };
              });
            setProjects(formattedProjects);
          },
        });
      })
      .catch(error => console.error('Error loading CSV:', error));
  }, []);

  return (
    <>
      {/* Map Section */}
      <Box sx={{ width: '100%', mb: 6, mt: 4 }}>
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            mb: 3,
            fontWeight: 600,
            color: 'primary.main'
          }}
        >
          Project Locations Across Venezuela
        </Typography>
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ 
            mb: 4,
            maxWidth: '800px',
            mx: 'auto',
            px: 2,
            color: 'text.secondary'
          }}
        >
          Explore our humanitarian projects throughout Venezuela. Click on any marker to learn more about the specific initiatives in each region.
        </Typography>
        <VenezuelaMap projects={projects} />
      </Box>
      
      {/* Project Cards Section */}
      <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            mb: 2,
            fontWeight: 600,
            color: 'primary.main'
          }}
        >
          Our Projects
        </Typography>
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ 
            mb: 5,
            maxWidth: '800px',
            mx: 'auto',
            color: 'text.secondary'
          }}
        >
          Detailed information about each humanitarian campaign and community initiative we support.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProjectCard
                title={project.title}
                description={project.description}
                date={project.date}
                link={project.link}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Projects;
