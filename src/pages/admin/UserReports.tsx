
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, X, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserReports = () => {
  const { toast } = useToast();
  
  // Mock data for user reports
  const [reports, setReports] = useState([
    { 
      id: '1', 
      company: 'Express Transit', 
      route: 'City A to City B', 
      currentPrice: 25.00, 
      reportedPrice: 27.50, 
      reportType: 'incorrect-price',
      reportedBy: 'User123', 
      date: '2023-08-15', 
      status: 'pending',
      message: 'The fare was increased to $27.50 today but not reflected in the app.'
    },
    { 
      id: '2', 
      company: 'Metro Lines', 
      route: 'City C to City D', 
      currentPrice: 18.50, 
      reportedPrice: null, 
      reportType: 'service-unavailable',
      reportedBy: 'User456', 
      date: '2023-08-14', 
      status: 'pending',
      message: 'This route has been discontinued as of last week.'
    },
    { 
      id: '3', 
      company: 'City Ferries', 
      route: 'Harbor to Downtown', 
      currentPrice: 12.00, 
      reportedPrice: 10.00, 
      reportType: 'incorrect-price',
      reportedBy: 'User789', 
      date: '2023-08-12', 
      status: 'pending',
      message: 'They are running a summer promo, the price is now $10.'
    },
  ]);
  
  const [selectedReport, setSelectedReport] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  
  const approveReport = (id: string) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: 'approved' } : report
    ));
    
    toast({
      title: "Report Approved",
      description: "The report has been approved and the fare will be updated.",
    });
  };

  const rejectReport = (id: string) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: 'rejected' } : report
    ));
    
    toast({
      title: "Report Rejected",
      description: "The report has been rejected.",
    });
  };

  const viewReportDetails = (report: any) => {
    setSelectedReport(report);
    setResponseMessage('');
  };

  const sendResponse = () => {
    if (selectedReport && responseMessage) {
      toast({
        title: "Response Sent",
        description: "Your response has been sent to the user.",
      });
      setResponseMessage('');
    }
  };

  const getReportTypeName = (type: string) => {
    switch (type) {
      case 'incorrect-price': return 'Incorrect Price';
      case 'service-unavailable': return 'Service Unavailable';
      case 'wrong-schedule': return 'Wrong Schedule';
      default: return 'Other Issue';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Reports</h1>
      
      <div className="flex items-center space-x-2 mb-4">
        <Input placeholder="Search reports..." className="max-w-sm" />
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User Submitted Reports</CardTitle>
          <CardDescription>Review and manage fare issues reported by users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Issue Type</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.company}</TableCell>
                  <TableCell>{report.route}</TableCell>
                  <TableCell>{getReportTypeName(report.reportType)}</TableCell>
                  <TableCell>{report.reportedBy}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <Badge variant={
                      report.status === 'approved' ? 'success' : 
                      report.status === 'rejected' ? 'destructive' : 
                      'outline'
                    }>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {report.status === 'pending' && (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => approveReport(report.id)}>
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => rejectReport(report.id)}>
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => viewReportDetails(report)}>
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Report Details</DialogTitle>
                          <DialogDescription>
                            View and respond to this user report.
                          </DialogDescription>
                        </DialogHeader>
                        {selectedReport && (
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-3 gap-2">
                              <div className="font-medium">Company:</div>
                              <div className="col-span-2">{selectedReport.company}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="font-medium">Route:</div>
                              <div className="col-span-2">{selectedReport.route}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="font-medium">Issue Type:</div>
                              <div className="col-span-2">{getReportTypeName(selectedReport.reportType)}</div>
                            </div>
                            {selectedReport.reportType === 'incorrect-price' && (
                              <>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="font-medium">Current Price:</div>
                                  <div className="col-span-2">${selectedReport.currentPrice.toFixed(2)}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="font-medium">Reported Price:</div>
                                  <div className="col-span-2">${selectedReport.reportedPrice.toFixed(2)}</div>
                                </div>
                              </>
                            )}
                            <div className="grid grid-cols-3 gap-2">
                              <div className="font-medium">Reported By:</div>
                              <div className="col-span-2">{selectedReport.reportedBy}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="font-medium">Date:</div>
                              <div className="col-span-2">{selectedReport.date}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="font-medium">Status:</div>
                              <div className="col-span-2">
                                <Badge variant={
                                  selectedReport.status === 'approved' ? 'success' : 
                                  selectedReport.status === 'rejected' ? 'destructive' : 
                                  'outline'
                                }>
                                  {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                            <div className="border p-3 rounded-md bg-muted/50">
                              <div className="font-medium mb-2">User Message:</div>
                              <p className="text-sm">{selectedReport.message}</p>
                            </div>
                            <div>
                              <Label htmlFor="response">Response to User</Label>
                              <Textarea 
                                id="response" 
                                value={responseMessage}
                                onChange={(e) => setResponseMessage(e.target.value)}
                                placeholder="Type your response here..."
                                className="mt-1"
                              />
                            </div>
                          </div>
                        )}
                        <DialogFooter className="flex flex-row justify-between sm:justify-between">
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={() => rejectReport(selectedReport?.id)}>
                              Reject Report
                            </Button>
                            <Button onClick={() => approveReport(selectedReport?.id)}>
                              Approve Report
                            </Button>
                          </div>
                          <Button onClick={sendResponse} variant="secondary">
                            Send Response
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserReports;
