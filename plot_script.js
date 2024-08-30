// Function to load JSON data
async function loadData() {
    const response = await fetch('tsne_data.json');
    return await response.json();
}

// Function to create the plot
function createPlot(data) {
    const trace = {
        x: data.map(d => d.x),
        y: data.map(d => d.y),
        z: data.map(d => d.z),
        mode: 'markers',
        type: 'scatter3d',
        text: data.map(d => d.name),
        hoverinfo: 'text',
        marker: {
            size: 10,
            color: data.map(d => d.z),
            colorscale: 'Viridis',
            symbol: 'square',
            opacity: 0.8
        }
    };

    const layout = {
        scene: {
            xaxis: {title: 't-SNE 1'},
            yaxis: {title: 't-SNE 2'},
            zaxis: {title: 't-SNE 3'}
        },
        margin: {l: 0, r: 0, b: 0, t: 0}
    };

    Plotly.newPlot('plot', [trace], layout);

    // Add images as textures
    Plotly.restyle('plot', {
        'marker.texture': data.map(d => `img src='pokemon_images/${d.name}'`),
        'marker.colorscale': null
    });

    document.getElementById('plot').on('plotly_click', function(plotlyEvent){
        if (plotlyEvent.points.length > 0) {
            const clickedPoint = plotlyEvent.points[0].pointNumber;
            const imageName = data[clickedPoint].name;
            console.log(`Clicked on: ${imageName}`); // Debug log
            const imgWindow = window.open("", "Image", "width=300,height=300");
            imgWindow.document.write(`
                <img src='pokemon_images/${imageName}' width='300' height='300' onerror="console.error('Failed to load image: ${imageName}');">
            `);
        }
    });
}

// Load data and create plot
loadData().then(data => createPlot(data));