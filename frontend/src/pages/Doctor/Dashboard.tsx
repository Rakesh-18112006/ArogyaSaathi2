import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Analytics from "./Analytics";
import { Html5QrcodeScanner } from "html5-qrcode";
import { motion } from "framer-motion";
import "./DoctorDashboard.css";
import axiosInstance from "../../api/axiosInstance";
import DriverTour from "../../components/DriverTour";

// Default values for demonstration
const DEFAULT_DOCTOR = {
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@hospital.com",
  specialization: "Cardiologist",
  hospital: "City General Hospital",
  experience: "8 years",
  phone: "+1 (555) 123-4567",
  license: "MED123456",
  department: "Cardiology",
};

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [migrantId, setMigrantId] = useState("");
  const [requestId, setRequestId] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [records, setRecords] = useState<any[]>([]);
  const [migrant, setMigrant] = useState<any>(null);
  const [scanning, setScanning] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [recordTitle, setRecordTitle] = useState("");
  const [recordContent, setRecordContent] = useState("");
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);

  // New states for additional features
  const [appointments, setAppointments] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [labReports, setLabReports] = useState<any[]>([]);
  const [quickNotes, setQuickNotes] = useState("");
  const [emergencyAlerts, setEmergencyAlerts] = useState<any[]>([]);
   const todayStats = {
    patients: 12,
    appointments: 8,
    emergencies: 2,
    completed: 5,
  };

  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  // Initialize QR scanner when scanning = true
  useEffect(() => {
    if (scanning && !scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        (decodedText: string) => {
          try {
            const parsed = JSON.parse(decodedText);
            if (parsed.uniqueId) {
              setMigrantId(parsed.uniqueId);
              setMigrant({
                name: parsed.name || "",
                dob: parsed.dob || "",
                phone: parsed.phone || "",
              });
              toast.success("QR Code scanned successfully!");
            } else {
              setMigrantId(decodedText);
              toast.success("QR Code scanned (plain text)!");
            }
          } catch {
            setMigrantId(decodedText);
            toast.success("QR Code scanned (plain text)!");
          }

          setScanning(false);
          scanner.clear().catch(() => {});
          scannerRef.current = null;
        },
        (errorMessage: string) => {
          console.warn("QR Scan error:", errorMessage);
        }
      );

      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [scanning]);

  // Load sample data
  useEffect(() => {
    // Sample appointments
    setAppointments([
      {
        id: 1,
        patient: "Rahul Kumar",
        time: "09:30 AM",
        status: "Scheduled",
        type: "Follow-up",
      },
      {
        id: 2,
        patient: "Priya Singh",
        time: "10:15 AM",
        status: "Waiting",
        type: "Consultation",
      },
      {
        id: 3,
        patient: "Amit Patel",
        time: "11:00 AM",
        status: "Scheduled",
        type: "Check-up",
      },
    ]);

    // Sample prescriptions
    setPrescriptions([
      {
        id: 1,
        patient: "Rahul Kumar",
        date: "2024-01-15",
        medicines: ["Paracetamol", "Vitamin C"],
      },
      {
        id: 2,
        patient: "Priya Singh",
        date: "2024-01-14",
        medicines: ["Antibiotic", "Pain Killer"],
      },
    ]);

    // Sample lab reports
    setLabReports([
      {
        id: 1,
        patient: "Amit Patel",
        test: "Blood Test",
        status: "Completed",
        date: "2024-01-15",
      },
      {
        id: 2,
        patient: "Rahul Kumar",
        test: "X-Ray",
        status: "Pending",
        date: "2024-01-16",
      },
    ]);

    // Sample emergency alerts
    setEmergencyAlerts([
      {
        id: 1,
        patient: "Emergency Case",
        priority: "High",
        time: "08:45 AM",
        status: "Active",
      },
    ]);
  }, []);

  // Request OTP
  const handleRequestOtp = async () => {
    try {
      const res = await axiosInstance.post("/access/request", { migrantId });
      setRequestId(res.data.requestId);
      setRequestSent(true);
      toast.success(res.data.message || "OTP sent to migrant's phone");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "OTP request failed");
    }
  };

  // Fetch migrant profile
  const fetchMigrantProfile = async () => {
    try {
      const res = await axiosInstance.get(`/access/profile/${migrantId}`);
      setMigrant(res.data.migrant);
      toast.success("Migrant profile fetched successfully");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Failed to fetch migrant profile"
      );
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const res = await axiosInstance.post("/access/verify", {
        requestId,
        otp,
      });

      toast.success(res.data.message || "OTP verified successfully!");
      setOtpVerified(true);
      await fetchMigrantProfile();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  // Fetch health records
  const fetchRecords = async () => {
    try {
      const res = await axiosInstance.get(`/access/records/${migrantId}`);
      setRecords(res.data.records);

      if (res.data.records.length > 0) {
        setMigrant({
          name: res.data.records[0]?.migrantName || "",
          phone: res.data.records[0]?.migrantPhone || "",
          dob: res.data.records[0]?.migrantDob || "",
          bloodGroup: res.data.records[0]?.bloodGroup || "N/A",
          allergies: res.data.records[0]?.allergies || "None",
          emergencyContact: res.data.records[0]?.emergencyContact || "N/A",
        });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch records");
    }
  };

  // Create new health record
  const handleCreateRecord = async () => {
    if (!recordTitle || !recordContent) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const res = await axiosInstance.post(
        `/access/health-records/${migrantId}`,
        {
          title: recordTitle,
          content: recordContent,
        }
      );
      toast.success(res.data.message || "Health record created successfully");
      setShowCreateForm(false);
      setRecordTitle("");
      setRecordContent("");
      fetchRecords();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create record");
    }
  };

  // Fetch AI summary
  const handleFetchSummary = async () => {
    setIsLoadingSummary(true);
    setSummary(null);
    try {
      const res = await axiosInstance.get(`/access/aiSummary/${migrantId}`);
      setSummary(res.data.summary);
      toast.success("Summary fetched successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch summary");
    } finally {
      setIsLoadingSummary(false);
    }
  };

  // New function to save quick notes
  const handleSaveQuickNotes = () => {
    if (quickNotes.trim()) {
      toast.success("Notes saved successfully!");
      setQuickNotes("");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            {/* Today's Stats */}
            <div className="doctor-stats-grid">
              <motion.div
                className="doctor-stat-card"
                whileHover={{ scale: 1.02 }}
              >
                <div className="doctor-stat-icon patients">
                  <i className="fas fa-user-injured"></i>
                </div>
                <div className="doctor-stat-content">
                  <h3>{todayStats.patients}</h3>
                  <p>Today's Patients</p>
                </div>
              </motion.div>

              <motion.div
                className="doctor-stat-card"
                whileHover={{ scale: 1.02 }}
              >
                <div className="doctor-stat-icon appointments">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="doctor-stat-content">
                  <h3>{todayStats.appointments}</h3>
                  <p>Appointments</p>
                </div>
              </motion.div>

              <motion.div
                className="doctor-stat-card"
                whileHover={{ scale: 1.02 }}
              >
                <div className="doctor-stat-icon emergencies">
                  <i className="fas fa-ambulance"></i>
                </div>
                <div className="doctor-stat-content">
                  <h3>{todayStats.emergencies}</h3>
                  <p>Emergencies</p>
                </div>
              </motion.div>

              <motion.div
                className="doctor-stat-card"
                whileHover={{ scale: 1.02 }}
              >
                <div className="doctor-stat-icon completed">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="doctor-stat-content">
                  <h3>{todayStats.completed}</h3>
                  <p>Completed</p>
                </div>
              </motion.div>
            </div>

            {/* Emergency Alerts */}
            {emergencyAlerts.length > 0 && (
              <motion.div className="doctor-card emergency-alert">
                <h3 className="doctor-card-title">
                  <i className="fas fa-exclamation-triangle"></i>
                  Emergency Alerts
                </h3>
                {emergencyAlerts.map((alert) => (
                  <div key={alert.id} className="emergency-alert-item">
                    <div className="alert-indicator"></div>
                    <div className="alert-content">
                      <h4>{alert.patient}</h4>
                      <p>
                        Priority: {alert.priority} • {alert.time}
                      </p>
                    </div>
                    <button className="doctor-btn doctor-btn-danger">
                      Attend
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Today's Appointments */}
            <motion.div className="doctor-card">
              <h3 className="doctor-card-title">
                <i className="fas fa-calendar-day"></i>
                Today's Appointments
              </h3>
              <div className="appointments-list">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="appointment-item">
                    <div className="appointment-time">{appointment.time}</div>
                    <div className="appointment-details">
                      <h4>{appointment.patient}</h4>
                      <p>{appointment.type}</p>
                    </div>
                    <span
                      className={`appointment-status ${appointment.status.toLowerCase()}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Notes */}
            <motion.div className="doctor-card">
              <h3 className="doctor-card-title">
                <i className="fas fa-sticky-note"></i>
                Quick Notes
              </h3>
              <textarea
                value={quickNotes}
                onChange={(e) => setQuickNotes(e.target.value)}
                className="doctor-quick-notes"
                placeholder="Add quick notes for today..."
                rows={3}
              />
              <button
                onClick={handleSaveQuickNotes}
                className="doctor-btn doctor-btn-primary mt-2"
              >
                Save Notes
              </button>
            </motion.div>

            {/* Existing QR Code and Migrant Access Section */}
            <motion.div className="doctor-card">
              <h3 className="doctor-card-title">
                <i className="fas fa-qrcode"></i>
                Access Migrant Records
              </h3>

              {!migrantId && !scanning && (
                <motion.button
                  onClick={() => setScanning(true)}
                  className="doctor-btn doctor-btn-primary"
                >
                  <i className="fas fa-camera"></i>
                  Scan QR Code
                </motion.button>
              )}

              {scanning && (
                <div className="doctor-qr-section">
                  <div className="doctor-qr-scanner">
                    <div id="reader" className="w-full h-64"></div>
                  </div>
                  <motion.button
                    onClick={() => setScanning(false)}
                    className="doctor-btn doctor-btn-danger"
                  >
                    <i className="fas fa-times"></i>
                    Cancel Scan
                  </motion.button>
                </div>
              )}

              {migrantId && !requestSent && (
                <motion.button
                  onClick={handleRequestOtp}
                  className="doctor-btn doctor-btn-primary mt-4"
                >
                  <i className="fas fa-paper-plane"></i>
                  Request OTP
                </motion.button>
              )}

              {requestSent && !otpVerified && (
                <motion.div className="doctor-otp-section">
                  <div className="doctor-input-group">
                    <label className="doctor-input-label">Enter OTP</label>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP sent to migrant"
                      className="doctor-input"
                    />
                  </div>
                  <motion.button
                    onClick={handleVerifyOtp}
                    className="doctor-btn doctor-btn-primary"
                  >
                    <i className="fas fa-check-circle"></i>
                    Verify OTP
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            {/* After OTP verification */}
            {migrant && otpVerified && (
              <>
                {/* Profile */}
                <motion.div className="doctor-card">
                  <h3 className="doctor-card-title">
                    <i className="fas fa-user"></i>
                    Migrant Profile
                  </h3>
                  <div className="doctor-profile-grid">
                    <div className="doctor-profile-item">
                      <span className="doctor-profile-label">Name</span>
                      <span className="doctor-profile-value">
                        {migrant.name}
                      </span>
                    </div>
                    <div className="doctor-profile-item">
                      <span className="doctor-profile-label">Phone</span>
                      <span className="doctor-profile-value">
                        {migrant.phone}
                      </span>
                    </div>
                    <div className="doctor-profile-item">
                      <span className="doctor-profile-label">
                        Date of Birth
                      </span>
                      <span className="doctor-profile-value">
                        {migrant.dob
                          ? new Date(migrant.dob).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="doctor-action-buttons mt-4 flex gap-3">
                    <motion.button
                      onClick={() => setShowCreateForm(true)}
                      className="doctor-btn doctor-btn-primary"
                    >
                      <i className="fas fa-plus-circle"></i>
                      Create Health Record
                    </motion.button>

                    <motion.button
                      onClick={fetchRecords}
                      className="doctor-btn doctor-btn-secondary"
                    >
                      <i className="fas fa-eye"></i>
                      View Records
                    </motion.button>

                    <motion.button
                      onClick={handleFetchSummary}
                      className="doctor-btn doctor-btn-secondary"
                      disabled={isLoadingSummary}
                    >
                      <i className="fas fa-file-alt"></i>
                      {isLoadingSummary ? "Loading..." : "Quick Summary"}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Create form */}
                {showCreateForm && (
                  <motion.div className="doctor-card mt-4">
                    <h3 className="doctor-card-title">New Health Record</h3>
                    <div className="doctor-input-group">
                      <label className="doctor-input-label">Title</label>
                      <input
                        value={recordTitle}
                        onChange={(e) => setRecordTitle(e.target.value)}
                        className="doctor-input"
                        placeholder="Record title"
                      />
                    </div>
                    <div className="doctor-input-group">
                      <label className="doctor-input-label">Content</label>
                      <textarea
                        value={recordContent}
                        onChange={(e) => setRecordContent(e.target.value)}
                        className="doctor-input"
                        placeholder="Record details"
                      />
                    </div>
                    <div className="flex gap-3 mt-3">
                      <motion.button
                        onClick={handleCreateRecord}
                        className="doctor-btn doctor-btn-primary"
                      >
                        Save Record
                      </motion.button>
                      <motion.button
                        onClick={() => setShowCreateForm(false)}
                        className="doctor-btn doctor-btn-danger"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* Records */}
            {otpVerified && records.length > 0 && (
              <motion.div className="doctor-card mt-4">
                <h3 className="doctor-card-title">
                  <i className="fas fa-file-medical"></i>
                  Health Records
                </h3>
                <div className="doctor-records-grid">
                  {records.map((record, index) => (
                    <motion.div
                      key={record._id || index}
                      className="doctor-record-card"
                    >
                      <div className="doctor-record-header">
                        <h4 className="doctor-record-title">{record.title}</h4>
                        <span className="doctor-record-date">
                          {new Date(record.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="doctor-record-details">{record.content}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* AI Summary */}
            {otpVerified && summary && (
              <motion.div className="doctor-card mt-4">
                <h3 className="doctor-card-title">
                  <i className="fas fa-file-alt"></i>
                  AI-Generated Summary
                </h3>
                <p className="doctor-record-details">{summary}</p>
              </motion.div>
            )}

            <Analytics />
          </>
        );

      case "patients":
        return (
          <motion.div className="doctor-card">
            <h3 className="doctor-card-title">
              <i className="fas fa-users"></i>
              Patient Management
            </h3>
            <p>Patient records and management tools will appear here.</p>
          </motion.div>
        );

      case "appointments":
        return (
          <motion.div className="doctor-card">
            <h3 className="doctor-card-title">
              <i className="fas fa-calendar-alt"></i>
              Appointment Schedule
            </h3>
            <p>Appointment scheduling and management interface.</p>
          </motion.div>
        );

      case "prescriptions":
        return (
          <motion.div className="doctor-card">
            <h3 className="doctor-card-title">
              <i className="fas fa-prescription"></i>
              Prescriptions
            </h3>
            <div className="prescriptions-list">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="prescription-item">
                  <h4>{prescription.patient}</h4>
                  <p>Date: {prescription.date}</p>
                  <div className="medicines-list">
                    {prescription.medicines.map((med: string, idx: number) => (
                      <span key={idx} className="medicine-tag">
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "reports":
        return (
          <motion.div className="doctor-card">
            <h3 className="doctor-card-title">
              <i className="fas fa-file-medical"></i>
              Lab Reports
            </h3>
            <div className="reports-list">
              {labReports.map((report) => (
                <div key={report.id} className="report-item">
                  <h4>{report.patient}</h4>
                  <p>Test: {report.test}</p>
                  <span
                    className={`report-status ${report.status.toLowerCase()}`}
                  >
                    {report.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "profile":
        return (
          <motion.div className="doctor-card">
            <h3 className="doctor-card-title">
              <i className="fas fa-user-md"></i>
              Doctor Profile
            </h3>
            <div className="doctor-profile-grid">
              <div className="doctor-profile-item">
                <span className="doctor-profile-label">Name</span>
                <span className="doctor-profile-value">
                  {user?.name || DEFAULT_DOCTOR.name}
                </span>
              </div>
              <div className="doctor-profile-item">
                <span className="doctor-profile-label">Email</span>
                <span className="doctor-profile-value">
                  {user?.email || DEFAULT_DOCTOR.email}
                </span>
              </div>
              <div className="doctor-profile-item">
                <span className="doctor-profile-label">Specialization</span>
                <span className="doctor-profile-value">
                  {DEFAULT_DOCTOR.specialization}
                </span>
              </div>
              <div className="doctor-profile-item">
                <span className="doctor-profile-label">License No.</span>
                <span className="doctor-profile-value">
                  {DEFAULT_DOCTOR.license}
                </span>
              </div>
              <div className="doctor-profile-item">
                <span className="doctor-profile-label">Department</span>
                <span className="doctor-profile-value">
                  {DEFAULT_DOCTOR.department}
                </span>
              </div>
            </div>
          </motion.div>
        );

      default:
        return (
          <div className="doctor-card">
            <h3 className="doctor-card-title">Welcome to your dashboard</h3>
            <p>Select a section from the menu to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="doctor-dashboard-container">
      <motion.div className="doctor-sidebar">
        <div className="doctor-sidebar-header">
          <div className="doctor-sidebar-logo">
            <i className="fas fa-heartbeat doctor-sidebar-logo-icon"></i>
            <span className="doctor-sidebar-logo-text">ArogyaSaathi</span>
          </div>
        </div>

        <div className="doctor-nav">
          <div
            className={`doctor-nav-item ${
              activeTab === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </div>

          <div
            className={`doctor-nav-item ${
              activeTab === "patients" ? "active" : ""
            }`}
            onClick={() => setActiveTab("patients")}
          >
            <i className="fas fa-user-injured"></i>
            <span>Patients</span>
          </div>

          <div
            className={`doctor-nav-item ${
              activeTab === "appointments" ? "active" : ""
            }`}
            onClick={() => setActiveTab("appointments")}
          >
            <i className="fas fa-calendar-alt"></i>
            <span>Appointments</span>
          </div>

          <div
            className={`doctor-nav-item ${
              activeTab === "prescriptions" ? "active" : ""
            }`}
            onClick={() => setActiveTab("prescriptions")}
          >
            <i className="fas fa-prescription"></i>
            <span>Prescriptions</span>
          </div>

          <div
            className={`doctor-nav-item ${
              activeTab === "reports" ? "active" : ""
            }`}
            onClick={() => setActiveTab("reports")}
          >
            <i className="fas fa-file-medical-alt"></i>
            <span>Lab Reports</span>
          </div>

          <div
            className={`doctor-nav-item ${
              activeTab === "profile" ? "active" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <i className="fas fa-user-md"></i>
            <span>Profile</span>
          </div>
        </div>

        <div className="doctor-sidebar-footer">
          <div className="doctor-logout-btn" onClick={logout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </div>
        </div>
      </motion.div>

      <div className="doctor-main">
        <div className="doctor-header">
          <h1 className="doctor-title">
            {activeTab === "dashboard"
              ? "Doctor Dashboard"
              : activeTab === "patients"
              ? "Patient Management"
              : activeTab === "appointments"
              ? "Appointment Schedule"
              : activeTab === "prescriptions"
              ? "Prescriptions"
              : activeTab === "reports"
              ? "Lab Reports"
              : activeTab === "profile"
              ? "My Profile"
              : activeTab}
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="doctor-btn doctor-btn-secondary"
            onClick={() => setIsTourActive(true)}
            style={{ marginLeft: "1rem" }}
          >
            <i className="fas fa-info-circle"></i>
            Help
          </motion.button>
        </div>
        <div className="doctor-content">{renderContent()}</div>
      </div>
      <DriverTour
        isActive={isTourActive}
        onComplete={() => setIsTourActive(false)}
        tourType="doctor"
      />
    </div>
  );
}