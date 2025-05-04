// src/main.ts

// ✅ Register required Chart.js components
import {
  ArcElement,
  BarController,
  BarElement, // <-- Required for bar charts
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  PieController,
  Title,
  Tooltip,
} from 'chart.js';

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  PieController, // For pie charts
  BarElement, // Bar visuals
  BarController, // Controls bar behavior
  CategoryScale, // X-axis (month labels)
  LinearScale, // Y-axis (amount values)
  Title // Optional chart title
);

// ✅ Bootstrap Angular app
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
