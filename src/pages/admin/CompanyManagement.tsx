
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Eye, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CompanyManagement = () => {
  const { toast } = useToast();
  
  // Mock data for pending verification companies
  const [pendingCompanies, setPendingCompanies] = useState([
    { id: '1', name: 'New Transit Co.', email: 'info@newtransit.com', contactPerson: 'John Smith', phone: '(123) 456-7890', submittedOn: '2023-08-10', status: 'pending' },
    { id: '2', name: 'Regional Express', email: 'contact@regionalexpress.com', contactPerson: 'Jane Doe', phone: '(987) 654-3210', submittedOn: '2023-08-08', status: 'pending' },
  ]);
  
  // Mock data for verified companies
  const [verifiedCompanies, setVerifiedCompanies] = useState([
    { id: '3', name: 'Express Transit', email: 'support@expresstransit.com', contactPerson: 'Michael Johnson', phone: '(456) 789-0123', verifiedOn: '2023-07-15', status: 'verified', fareCount: 12 },
    { id: '4', name: 'Metro Lines', email: 'info@metrolines.com', contactPerson: 'Sarah Williams', phone: '(789) 012-3456', verifiedOn: '2023-07-10', status: 'verified', fareCount: 8 },
    { id: '5', name: 'City Ferries', email: 'booking@cityferries.com', contactPerson: 'Robert Brown', phone: '(234) 567-8901', verifiedOn: '2023-07-05', status: 'verified', fareCount: 5 },
  ]);
  
  // All companies combined
  const allCompanies = [...pendingCompanies, ...verifiedCompanies];
  
  const [viewingCompany, setViewingCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const approveCompany = (id: string) => {
    // Move company from pending to verified
    const companyToApprove = pendingCompanies.find(company => company.id === id);
    if (companyToApprove) {
      setPendingCompanies(pendingCompanies.filter(company => company.id !== id));
      setVerifiedCompanies([...verifiedCompanies, {
        ...companyToApprove,
        status: 'verified',
        verifiedOn: new Date().toISOString().split('T')[0],
        fareCount: 0
      }]);
      
      toast({
        title: "Company Verified",
        description: `${companyToApprove.name} has been verified successfully.`,
      });
    }
  };

  const rejectCompany = (id: string) => {
    // Update status to rejected
    setPendingCompanies(pendingCompanies.map(company => 
      company.id === id ? { ...company, status: 'rejected' } : company
    ));
    
    const companyName = pendingCompanies.find(company => company.id === id)?.name;
    
    toast({
      title: "Company Rejected",
      description: `${companyName} verification has been rejected.`,
      variant: "destructive"
    });
  };

  const viewCompanyDetails = (company: any) => {
    setViewingCompany(company);
  };

  const filteredCompanies = allCompanies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Company Management</h1>
      
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending Verification</TabsTrigger>
          <TabsTrigger value="verified">Verified Companies</TabsTrigger>
          <TabsTrigger value="all">All Companies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Verification Requests</CardTitle>
              <CardDescription>Review and verify transport companies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Submitted On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>{company.contactPerson}</TableCell>
                      <TableCell>{company.email}</TableCell>
                      <TableCell>{company.submittedOn}</TableCell>
                      <TableCell>
                        <Badge variant={
                          company.status === 'verified' ? 'success' : 
                          company.status === 'rejected' ? 'destructive' : 
                          'outline'
                        }>
                          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {company.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => approveCompany(company.id)}>
                              <Check className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => rejectCompany(company.id)}>
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => viewCompanyDetails(company)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Company Details</DialogTitle>
                                  <DialogDescription>
                                    Review this company's verification request.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Company Name</Label>
                                    <div className="col-span-3">{company.name}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Contact Person</Label>
                                    <div className="col-span-3">{company.contactPerson}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Email</Label>
                                    <div className="col-span-3">{company.email}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Phone</Label>
                                    <div className="col-span-3">{company.phone}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Submitted On</Label>
                                    <div className="col-span-3">{company.submittedOn}</div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => rejectCompany(company.id)}>
                                    Reject
                                  </Button>
                                  <Button onClick={() => approveCompany(company.id)}>
                                    Approve
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="verified" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Verified Companies</CardTitle>
              <CardDescription>View all verified transport companies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Fare Count</TableHead>
                    <TableHead>Verified On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verifiedCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>{company.contactPerson}</TableCell>
                      <TableCell>{company.email}</TableCell>
                      <TableCell>{company.fareCount}</TableCell>
                      <TableCell>{company.verifiedOn}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Companies</CardTitle>
              <CardDescription>Search and manage all companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4 relative">
                <Search className="h-4 w-4 absolute left-3 text-muted-foreground" />
                <Input 
                  placeholder="Search companies..." 
                  className="pl-9 max-w-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>{company.contactPerson}</TableCell>
                      <TableCell>{company.email}</TableCell>
                      <TableCell>
                        <Badge variant={
                          company.status === 'verified' ? 'default' : 
                          company.status === 'rejected' ? 'destructive' : 
                          'outline'
                        }>
                          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyManagement;
