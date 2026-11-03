import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Dashboard } from './dashboard';
import { MasterService } from '../../core/Services/master-service';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [{
        provide: MasterService,
        useValue: {
          getDashboard: () => of({
            totalEmployee: 444,
            totalProject: 260,
            recentEmployee: [{
              employeeId: 14546,
              employeeName: 'Sample Employee',
              contactNo: '1234567890',
              emailId: 'sample@example.com',
              deptId: 3974,
              role: 'Employee',
              createdDate: '2026-10-28T00:00:00'
            }],
            recentProjects: [{
              projectId: 1935,
              projectName: 'Sample Project',
              clientName: 'Sample Client',
              startDate: '2026-11-03T00:00:00',
              leadByEmpId: 7628,
              contactPerson: 'Sample Contact',
              contactNo: '1234567890',
              emailId: 'sample@example.com'
            }]
          })
        }
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display dashboard counts and recent records', () => {
    const content = fixture.nativeElement.textContent as string;

    expect(content).toContain('444');
    expect(content).toContain('260');
    expect(content).toContain('Sample Employee');
    expect(content).toContain('Sample Project');
  });
});
